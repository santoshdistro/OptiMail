function addNewProductCardRecordObject() {
    window.globalProductCardsDatabaseArray.push({
        id: Date.now(),
        title: "Bespoke Premium Design",
        category: "arrivals", 
        img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
        url: "https://yourstore.com/new-arrivals",
        ctaText: "Explore Now ➜",
        layoutScale: "large",
        shapeType: "rectangle"
    });
    renderControlPanelProductCardsFormFields();
    updatePreview();
}

function removeProductCardRecordObject(targetId) {
    window.globalProductCardsDatabaseArray = window.globalProductCardsDatabaseArray.filter(card => card.id !== targetId);
    renderControlPanelProductCardsFormFields();
    updatePreview();
}

function updateProductCardDataField(targetId, objectKey, elementValue) {
    const matchedCardIndex = window.globalProductCardsDatabaseArray.findIndex(card => card.id === targetId);
    if(matchedCardIndex !== -1) {
        window.globalProductCardsDatabaseArray[matchedCardIndex][objectKey] = elementValue;
        updatePreview();
    }
}

function renderControlPanelProductCardsFormFields() {
    const containerNode = document.getElementById('dynamic-cards-input-list-container');
    if (!containerNode) return;
    containerNode.innerHTML = "";

    const rowBgStyleHex = window.isDarkModeActive ? "#070a13" : "#ffffff";
    const rowBorderStyleHex = window.isDarkModeActive ? "#1e293b" : "#cbd5e1";
    const innerInputBgHex = window.isDarkModeActive ? "#0d1324" : "#f1f5f9";
    const fontTitleHex = window.isDarkModeActive ? "#ffffff" : "#1e293b";

    window.globalProductCardsDatabaseArray.forEach((card, pointerIndex) => {
        const fieldsWrapperNode = document.createElement('div');
        fieldsWrapperNode.className = "p-4 rounded-xl space-y-2 relative border theme-transition";
        fieldsWrapperNode.style.backgroundColor = rowBgStyleHex;
        fieldsWrapperNode.style.borderColor = rowBorderStyleHex;
        
        fieldsWrapperNode.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-800/20 pb-1.5">
                <span class="text-[10px] font-bold text-emerald-500">GLASSES CARD INSTANCE #${pointerIndex + 1}</span>
                <button onclick="removeProductCardRecordObject(${card.id})" class="text-[9px] text-rose-500 hover:text-rose-400 transition font-bold cursor-pointer">[🗑️ Remove]</button>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <input type="text" value="${card.title}" placeholder="Product Title" oninput="updateProductCardDataField(${card.id}, 'title', this.value)" style="background-color: ${innerInputBgHex}; color: ${fontTitleHex};" class="col-span-2 border border-slate-300/10 rounded p-1.5 text-xs">
                <select onchange="updateProductCardDataField(${card.id}, 'category', this.value)" style="background-color: ${innerInputBgHex};" class="border border-slate-300/10 text-slate-400 rounded text-[10px] px-1 focus:outline-none">
                    <option value="men" ${card.category === 'men' ? 'selected' : ''}>Men's</option>
                    <option value="women" ${card.category === 'women' ? 'selected' : ''}>Women's</option>
                    <option value="arrivals" ${card.category === 'arrivals' ? 'selected' : ''}>New Arrivals</option>
                </select>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <input type="text" value="${card.ctaText || 'Shop Now ➜'}" placeholder="Button Text" oninput="updateProductCardDataField(${card.id}, 'ctaText', this.value)" style="background-color: ${innerInputBgHex}; color: ${fontTitleHex};" class="border border-slate-300/10 rounded p-1.5 text-xs">
                <select onchange="updateProductCardDataField(${card.id}, 'layoutScale', this.value)" style="background-color: ${innerInputBgHex};" class="border border-slate-300/10 text-slate-400 rounded text-[10px] px-1 focus:outline-none">
                    <option value="small" ${card.layoutScale === 'small' ? 'selected' : ''}>Small Box</option>
                    <option value="medium" ${card.layoutScale === 'medium' ? 'selected' : ''}>Medium Box</option>
                    <option value="large" ${card.layoutScale === 'large' ? 'selected' : ''}>Large Box</option>
                </select>
                <select onchange="updateProductCardDataField(${card.id}, 'shapeType', this.value)" style="background-color: ${innerInputBgHex};" class="border border-slate-300/10 text-slate-400 rounded text-[10px] px-1 focus:outline-none">
                    <option value="square" ${card.shapeType === 'square' ? 'selected' : ''}>Square</option>
                    <option value="rectangle" ${card.shapeType === 'rectangle' ? 'selected' : ''}>Rectangle</option>
                    <option value="full" ${card.shapeType === 'full' ? 'selected' : ''}>Full Page</option>
                </select>
            </div>
            <input type="text" value="${card.img}" placeholder="Image Direct Source Link (.jpg / .png)" oninput="updateProductCardDataField(${card.id}, 'img', this.value)" style="background-color: ${innerInputBgHex};" class="w-full border border-slate-300/10 rounded p-1.5 text-[11px] font-mono text-slate-400">
            <input type="text" value="${card.url}" placeholder="Redirect E-Store Target Link" oninput="updateProductCardDataField(${card.id}, 'url', this.value)" style="background-color: ${innerInputBgHex};" class="w-full border border-slate-300/10 rounded p-1.5 text-[11px] font-mono text-slate-400">
        `;
        containerNode.appendChild(fieldsWrapperNode);
    });
}

function setTemplate(templateType) {
    window.currentSelectedTemplateType = templateType;
    const presetsIdsList = ['tpl-grid', 'tpl-hero', 'tpl-split', 'tpl-arrivals', 'tpl-custom'];
    
    presetsIdsList.forEach(id => {
        const node = document.getElementById(id);
        if (node) {
            node.style.borderWidth = "1px";
            node.style.borderColor = window.isDarkModeActive ? "#1e293b" : "#cbd5e1";
        }
    });

    const activeNode = document.getElementById(`tpl-${templateType}`);
    if (activeNode) {
        activeNode.style.borderWidth = "2px";
        activeNode.style.borderColor = "#10b981";
    }
    
    const displayLabel = document.getElementById('finalTemplateDisplay');
    if (displayLabel) displayLabel.innerText = `${templateType.toUpperCase()} Core Blueprint Suite`;
    
    updatePreview();
}

// Blocks layout distortions and image stretching rules completely
function resolveAdaptiveImageScalingProperties(shapeType, layoutScale) {
    let baseHeightValue = "150px";
    if (shapeType === 'square') {
        baseHeightValue = "230px";
    } else if (shapeType === 'full') {
        baseHeightValue = "350px";
    } else {
        if (layoutScale === 'small') baseHeightValue = "110px";
        if (layoutScale === 'medium') baseHeightValue = "170px";
        if (layoutScale === 'large') baseHeightValue = "250px";
    }
    return `width: 100%; height: ${baseHeightValue}; object-fit: cover; display: block;`;
}

function generateCompiledEmailHtmlBodySource() {
    const accentHexColor = document.getElementById('styleColor').value;
    const roundingRadiusPx = document.getElementById('styleRadius').value;
    const headingFontPtScale = document.getElementById('styleTextSize').value;
    const headBannerCopyText = document.getElementById('mainHeadline').value;
    const subheadBannerCopyText = document.getElementById('mainSubhead').value;
    const corporateTradingAddress = document.getElementById('footerAddress').value || "Premium Eyewear Design Group, London, UK";
    const verifiedSenderFromEmail = document.getElementById('senderIdentity').value;

    document.getElementById('styleColorHex').value = accentHexColor.toUpperCase();

    let masterContainerCanvasBgColor = "#ffffff";
    let globalTypographyStackTree = "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif";

    let renderedHtmlPayloadStream = `
        <div style="background-color: #f8fafc; padding: 28px 14px; font-family: ${globalTypographyStackTree}; color: #1e293b; margin: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${masterContainerCanvasBgColor}; border-radius: ${roundingRadiusPx}; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.03); border-collapse: collapse;">
                <tr>
                    <td style="padding: 40px 32px; text-align: center; background-color: #0b0f19;">
                        <div style="font-size: 11px; font-weight: 800; color: ${accentHexColor}; letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase;">PREMIUM LOOKBOOK COMPOSITION</div>
                        <h1 style="color: #ffffff; font-size: ${headingFontPtScale}; font-weight: 800; margin: 0; line-height: 1.25; text-transform: uppercase;">${headBannerCopyText}</h1>
                        <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 16px 0 0 0;">${subheadBannerCopyText}</p>
                    </td>
                </tr>
                <tr><td style="padding: 20px 14px; background-color: ${masterContainerCanvasBgColor};">
    `;

    // PRESET 1 ENGINE
    if(window.currentSelectedTemplateType === 'grid') {
        renderedHtmlPayloadStream += `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr>`;
        window.globalProductCardsDatabaseArray.forEach((card, index) => {
            if(index > 0 && index % 2 === 0) renderedHtmlPayloadStream += `</tr><tr>`;
            renderedHtmlPayloadStream += `
                <td width="50%" style="padding: 8px; vertical-align: top;">
                    <a href="${card.url}" target="_blank" style="text-decoration: none; display: block; background-color: #f8fafc; border-radius: ${roundingRadiusPx}; overflow: hidden; border: 1px solid #e2e8f0; text-align: center;">
                        <img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)}">
                        <div style="padding: 12px 8px; font-size: 12px; font-weight: 700; color: #0f172a; line-height:1.3;">${card.title}</div>
                        <div style="padding: 0 8px 12px 8px; font-size: 10px; font-weight: 700; color: ${accentHexColor}; text-transform: uppercase;">${card.ctaText || 'Shop Glasses ➜'}</div>
                    </a>
                </td>`;
        });
        renderedHtmlPayloadStream += `</tr></table>`;

    // PRESET 2 ENGINE
    } else if (window.currentSelectedTemplateType === 'hero') {
        window.globalProductCardsDatabaseArray.forEach((card) => {
            renderedHtmlPayloadStream += `
                <div style="padding: 8px 6px; margin-bottom: 12px;">
                    <a href="${card.url}" target="_blank" style="text-decoration: none; display: block; overflow: hidden; border-radius: ${roundingRadiusPx}; border: 1px solid #e2e8f0; background: #ffffff;">
                        <img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)}">
                        <div style="padding: 24px; text-align: center; background-color: #ffffff;">
                            <div style="font-size: 15px; font-weight: 800; color: #0b0f19; margin-bottom: 12px; text-transform: uppercase;">${card.title}</div>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr><td align="center" style="background-color: ${accentHexColor}; border-radius: 4px;"><span style="display: inline-block; padding: 12px 24px; color: #ffffff; font-size: 11px; font-weight: 700; text-decoration: none; text-transform: uppercase;">${card.ctaText || 'EXPLORE COLLECTION ➜'}</span></td></tr>
                            </table>
                        </div>
                    </a>
                </div>`;
        });

    // PRESET 3 ENGINE
    } else if (window.currentSelectedTemplateType === 'split') {
        const mensFramesList = window.globalProductCardsDatabaseArray.filter(c => c.category === 'men');
        const womensFramesList = window.globalProductCardsDatabaseArray.filter(c => c.category === 'women');
        const remnantsFramesList = window.globalProductCardsDatabaseArray.filter(c => c.category !== 'men' && c.category !== 'women');

        function processSymmetricalCascadeSubgrids(cardsArray, blockLabelString) {
            if (cardsArray.length === 0) return "";
            let blockStream = `<div style="padding: 10px 8px; font-size: 12px; font-weight: 800; color: #0b0f19; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid #0b0f19; margin-bottom: 12px; margin-top: 14px;">${blockLabelString}</div>`;
            
            blockStream += `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;"><tr>`;
            const primaryPairSlice = cardsArray.slice(0, 2);
            primaryPairSlice.forEach(card => {
                blockStream += `
                    <td width="50%" style="padding: 8px; vertical-align: top;">
                        <a href="${card.url}" target="_blank" style="text-decoration: none; display: block; background-color: #ffffff; text-align: center;">
                            <img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)} border-radius: ${roundingRadiusPx};">
                            <div style="padding: 8px 4px; font-size: 12px; font-weight: 700; color: #1e293b;">${card.title}</div>
                            <div style="padding-bottom: 6px; font-size: 10px; font-weight: 700; color: ${accentHexColor}; text-transform: uppercase;">${card.ctaText || 'Shop Selection ➜'}</div>
                        </a>
                    </td>`;
            });
            blockStream += `</tr></table>`;

            const downstreamRemnantsSlice = cardsArray.slice(2);
            if(downstreamRemnantsSlice.length > 0) {
                blockStream += `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-top: 4px;"><tr>`;
                downstreamRemnantsSlice.forEach((card, remIndex) => {
                    if (remIndex > 0 && remIndex % 2 === 0) blockStream += `</tr><tr>`;
                    blockStream += `
                        <td width="50%" style="padding: 6px; vertical-align: top;">
                            <a href="${card.url}" target="_blank" style="text-decoration: none; display: block; background-color: #f8fafc; border-radius: ${roundingRadiusPx}; border: 1px solid #e2e8f0; text-align: center;">
                                <img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)}">
                                <div style="padding: 8px 4px; font-size: 11px; font-weight: 600; color: #334155;">${card.title}</div>
                                <div style="padding-bottom: 6px; font-size: 9px; font-weight: 700; color: ${accentHexColor}; text-transform: uppercase;">${card.ctaText || 'Shop Item ➜'}</div>
                            </a>
                        </td>`;
                });
                blockStream += `</tr></table>`;
            }
            return blockStream;
        }

        renderedHtmlPayloadStream += processSymmetricalCascadeSubgrids(mensFramesList, "EXPLORE MEN'S EXCLUSIVE SELECTION");
        renderedHtmlPayloadStream += processSymmetricalCascadeSubgrids(womensFramesList, "EXPLORE WOMEN'S LUXURY LOOKS");
        renderedHtmlPayloadStream += processSymmetricalCascadeSubgrids(remnantsFramesList, "ADDITIONAL EDITORIAL MATRIX SELECTIONS");

    // PRESET 4 ENGINE
    } else if (window.currentSelectedTemplateType === 'arrivals') {
        renderedHtmlPayloadStream += `<div style="padding: 0 6px 12px 6px; font-size: 13px; font-weight: 800; color: ${accentHexColor}; text-transform: uppercase; text-align: center;">✨ ACTIVE CAMPAIGN CROSS CATEGORY SELECTION ✨</div>`;
        window.globalProductCardsDatabaseArray.forEach((card, stepIdx) => {
            const toggleRowOrientationFlag = stepIdx % 2 === 0;
            renderedHtmlPayloadStream += `
                <div style="margin-bottom: 16px; padding: 6px;">
                    <a href="${card.url}" target="_blank" style="text-decoration: none; display: block; background-color: #f8fafc; border-radius: ${roundingRadiusPx}; border: 1px solid #e2e8f0; overflow: hidden;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                ${toggleRowOrientationFlag ? `
                                <td width="42%"><img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)}"></td>
                                <td width="58%" style="padding: 16px; vertical-align: middle;">
                                    <div style="font-size: 10px; font-weight: 800; color: ${accentHexColor}; text-transform: uppercase; margin-bottom: 4px;">CATEGORY: ${card.category.toUpperCase()}</div>
                                    <div style="font-size: 13px; font-weight: 800; color: #0b0f19; margin-bottom: 6px;">${card.title}</div>
                                    <div style="font-size: 11px; font-weight: 700; color: ${accentHexColor}; text-transform: uppercase;">${card.ctaText || 'EXPLORE NOW ➜'}</div>
                                </td>` : `
                                <td width="58%" style="padding: 16px; vertical-align: middle; text-align: right;">
                                    <div style="font-size: 10px; font-weight: 800; color: ${accentHexColor}; text-transform: uppercase; margin-bottom: 4px;">CATEGORY: ${card.category.toUpperCase()}</div>
                                    <div style="font-size: 13px; font-weight: 800; color: #0b0f19; margin-bottom: 6px;">${card.title}</div>
                                    <div style="font-size: 11px; font-weight: 700; color: ${accentHexColor}; text-transform: uppercase;">${card.ctaText || 'EXPLORE NOW ➜'}</div>
                                </td>
                                <td width="42%"><img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)}"></td>`}
                            </tr>
                        </table>
                    </a>
                </div>`;
        });

    // PRESET 5 ENGINE
    } else if (window.currentSelectedTemplateType === 'custom') {
        window.globalProductCardsDatabaseArray.forEach(card => {
            renderedHtmlPayloadStream += `
                <div style="margin-bottom: 16px; padding: 10px; background-color: #ffffff; border: 1px dashed ${accentHexColor}; border-radius: ${roundingRadiusPx}; overflow: hidden;">
                    <a href="${card.url}" target="_blank" style="text-decoration: none; display: block;">
                        <img src="${card.img}" style="${resolveAdaptiveImageScalingProperties(card.shapeType, card.layoutScale)} border-radius: ${roundingRadiusPx}; margin-bottom: 10px;">
                        <div style="font-size: 14px; font-weight: 800; color: #0b0f19; text-align: center; margin-bottom: 4px; text-transform: uppercase;">${card.title}</div>
                        <div style="font-size: 11px; font-weight: 700; color: ${accentHexColor}; text-align: center; text-transform: uppercase; margin-bottom: 8px;">[ ${card.category.toUpperCase()} COLLECTION ]</div>
                        <div style="text-align: center; font-size: 11px; font-weight: 700; color: #ffffff; background-color: ${accentHexColor}; padding: 8px; border-radius: 4px; text-transform: uppercase;">${card.ctaText || 'SHOP SELECTION'}</div>
                    </a>
                </div>`;
        });
    }

    renderedHtmlPayloadStream += `
                    </td></tr>
                <tr>
                    <td style="padding: 36px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #f1f5f9;">
                        <div style="font-size: 11px; color: #64748b; line-height: 1.7;">
                            You received this lookbook update because you are registered as an active retail client profile within our digital storefront system node.
                            <br><br><strong>Registered Trading Headquarters:</strong><br>${corporateTradingAddress}<br><br>
                            If these styling digests no longer match your design goals, you can securely trigger profile removal below:<br>
                            <a href="mailto:${verifiedSenderFromEmail}?subject=UNSUBSCRIBE-REQUEST-SECURE" target="_blank" style="color: #ef4444; font-weight: 700; text-decoration: underline; display: inline-block; margin-top: 8px; border: 1px solid #fee2e2; background-color: #fef2f2; padding: 6px 14px; border-radius: 6px;"> Click Here Unsubscribe</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;
    return renderedHtmlPayloadStream;
}

function updatePreview() { 
    const canvasFrame = document.getElementById('liveEmailCanvasFrame'); 
    if(canvasFrame) canvasFrame.innerHTML = generateCompiledEmailHtmlBodySource(); 
}