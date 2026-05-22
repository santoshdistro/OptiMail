function switchTab(targetTabId) {
    document.getElementById(window.currentActiveTab).classList.add('hidden');
    document.getElementById(`btn-${window.currentActiveTab}`).className = "px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer";
    document.getElementById(targetTabId).classList.remove('hidden');
    
    if (targetTabId === 'design-tab') { 
        document.getElementById(`btn-${targetTabId}`).className = "px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-lg bg-emerald-500 text-slate-950 shadow-md transition-all duration-200 cursor-pointer"; 
    } else if (targetTabId === 'unsubscribe-tab') { 
        document.getElementById(`btn-${targetTabId}`).className = "px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-lg bg-rose-500 text-white shadow-md transition-all duration-200 cursor-pointer"; 
    } else { 
        document.getElementById(`btn-${targetTabId}`).className = "px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-lg bg-slate-800 text-white border border-slate-700 shadow-md transition-all duration-200 cursor-pointer"; 
    }
    window.currentActiveTab = targetTabId;
}

function toggleGlobalAppThemeMode() {
    window.isDarkModeActive = !window.isDarkModeActive;
    
    const bodyNode = document.getElementById('app-body');
    const headerNode = document.getElementById('app-header');
    const tabsNode = document.getElementById('tabs-wrapper');
    const controlPanelNode = document.getElementById('control-panel-box');
    const previewPanelNode = document.getElementById('preview-panel-box');
    const presetsScroller = document.getElementById('presets-scroller');
    const tuningNode = document.getElementById('tuning-wrapper-box');
    const headersNode = document.getElementById('headers-wrapper-box');
    const dropzoneNode = document.getElementById('dropzone-box');
    const metadataNode = document.getElementById('listMetaStatus');
    const blacklistNode = document.getElementById('blacklist-summary-card');
    const gatewayNode = document.getElementById('gateway-credentials-box');
    const dispatchSummaryNode = document.getElementById('dispatch-summary-card');
    const consoleNode = document.getElementById('dispatchConsoleLog');
    const footerCardNode = document.getElementById('licensing-footer-card');
    const dotsNode = document.getElementById('mock-browser-dots');
    const canvasInnerBgNode = document.getElementById('canvas-inner-bg');
    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');

    if (!window.isDarkModeActive) {
        themeIcon.innerText = "🌙";
        themeLabel.innerText = "Night Mode";
        bodyNode.className = "bg-[#f0f4f8] text-slate-800 min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-600 theme-transition";
        headerNode.className = "bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 sticky top-0 z-50 flex flex-wrap gap-6 items-center justify-between shadow-sm theme-transition";
        tabsNode.className = "flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner theme-transition";
        controlPanelNode.className = "lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-7 shadow-xl flex flex-col justify-between min-h-[800px] theme-transition";
        previewPanelNode.className = "lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-7 shadow-xl space-y-4 theme-transition";
        
        document.getElementById('brand-title').className = "text-xl font-extrabold tracking-tight text-slate-900";
        document.getElementById('brand-subtitle').className = "text-xs text-slate-500 mt-0.5";
        document.getElementById('design-title-node').className = "text-lg font-black text-slate-900 tracking-tight flex items-center gap-2";
        document.getElementById('design-subtitle-node').className = "text-xs text-slate-500 mt-1";
        document.getElementById('audience-title-node').className = "text-lg font-black text-slate-900 tracking-tight flex items-center gap-2";
        document.getElementById('audience-subtitle-node').className = "text-xs text-slate-500 mt-1";
        document.getElementById('blacklist-title-node').className = "text-lg font-black text-slate-900 tracking-tight flex items-center gap-2";
        document.getElementById('blacklist-subtitle-node').className = "text-xs text-slate-500 mt-1";
        document.getElementById('dispatch-title-node').className = "text-lg font-black text-slate-900 tracking-tight flex items-center gap-2";
        document.getElementById('dispatch-subtitle-node').className = "text-xs text-slate-500 mt-1";
        document.getElementById('preview-title-node').className = "text-sm font-bold text-slate-900 tracking-wide";
        document.getElementById('preview-subtitle-node').className = "text-[11px] text-slate-500 mt-0.5";
        document.getElementById('asset-block-title').className = "text-xs font-bold uppercase tracking-widest text-slate-500";
        document.getElementById('licensing-author').className = "text-slate-800 font-bold";

        const subContainersList = [presetsScroller, tuningNode, headersNode, dropzoneNode, metadataNode, blacklistNode, gatewayNode, dispatchSummaryNode, consoleNode, footerCardNode, dotsNode, canvasInnerBgNode];
        subContainersList.forEach(node => {
            if(node) { node.style.backgroundColor = "#f8fafc"; node.style.borderColor = "#e2e8f0"; }
        });
        document.getElementById('dropzone-text').className = "text-xs font-bold text-slate-800";
    } else {
        themeIcon.innerText = "☀️";
        themeLabel.innerText = "Day Mode";
        bodyNode.className = "bg-[#070a13] text-slate-100 min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-400 theme-transition";
        headerNode.className = "bg-[#0d1324]/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-5 sticky top-0 z-50 flex flex-wrap gap-6 items-center justify-between shadow-2xl theme-transition";
        tabsNode.className = "flex items-center bg-[#070a13] p-1.5 rounded-xl border border-slate-800/60 shadow-inner theme-transition";
        controlPanelNode.className = "lg:col-span-5 bg-[#0d1324] border border-slate-800 rounded-2xl p-7 shadow-2xl glow-emerald flex flex-col justify-between min-h-[800px] theme-transition";
        previewPanelNode.className = "lg:col-span-7 bg-[#0d1324] border border-slate-800 rounded-2xl p-7 shadow-2xl space-y-4 theme-transition";
        
        document.getElementById('brand-title').className = "text-xl font-extrabold tracking-tight text-white";
        document.getElementById('brand-subtitle').className = "text-xs text-slate-400 mt-0.5";
        document.getElementById('design-title-node').className = "text-lg font-black text-white tracking-tight flex items-center gap-2";
        document.getElementById('design-subtitle-node').className = "text-xs text-slate-400 mt-1";
        document.getElementById('audience-title-node').className = "text-lg font-black text-white tracking-tight flex items-center gap-2";
        document.getElementById('audience-subtitle-node').className = "text-xs text-slate-400 mt-1";
        document.getElementById('blacklist-title-node').className = "text-lg font-black text-white tracking-tight flex items-center gap-2";
        document.getElementById('blacklist-subtitle-node').className = "text-xs text-slate-400 mt-1";
        document.getElementById('dispatch-title-node').className = "text-lg font-black text-white tracking-tight flex items-center gap-2";
        document.getElementById('dispatch-subtitle-node').className = "text-xs text-slate-400 mt-1";
        document.getElementById('preview-title-node').className = "text-sm font-bold text-white tracking-wide";
        document.getElementById('preview-subtitle-node').className = "text-[11px] text-slate-400 mt-0.5";
        document.getElementById('asset-block-title').className = "text-xs font-bold uppercase tracking-widest text-slate-400";
        document.getElementById('licensing-author').className = "text-slate-300";

        const subContainersList = [presetsScroller, tuningNode, headersNode, dropzoneNode, metadataNode, blacklistNode, gatewayNode, dispatchSummaryNode, consoleNode, footerCardNode, dotsNode, canvasInnerBgNode];
        subContainersList.forEach(node => {
            if(node) { node.style.backgroundColor = "#070a13"; node.style.borderColor = "#1e293b"; }
        });
        document.getElementById('dropzone-text').className = "text-xs font-bold text-slate-200";
    }
    setTemplate(window.currentSelectedTemplateType);
    renderControlPanelProductCardsFormFields();
}