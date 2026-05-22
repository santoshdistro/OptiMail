// ==================== TAB 2: EXPLICIT REFERENCE FREE SPREADSHEET PARSER ====================
function parseAndExtractSpreadsheetData() {
    console.log("⚓ Ingestion pipeline triggered securely via clear execution route.");
    
    // Hard target the actual DOM node directly from the hardware tree layer
    const hardwareInputNode = document.getElementById('excelFile');
    
    if (!hardwareInputNode) {
        console.error("Critical DOM Matrix Failure: 'excelFile' selector node could not be resolved.");
        return;
    }
    
    // Strict safety check ensuring files collection is completely populated
    if (!hardwareInputNode.files || hardwareInputNode.files.length === 0) {
        console.error("Critical File Ingestion Failure: Target element located, but the files array payload is empty.");
        return;
    }
    
    // Secure extraction of the verified binary file blob reference
    const primaryFileBlob = hardwareInputNode.files[0]; 
    console.log(`🚀 Initiating binary stream processing for: ${primaryFileBlob.name} (${primaryFileBlob.size} bytes)`);
    
    const parsingMatrixReaderStream = new FileReader();
    
    parsingMatrixReaderStream.onload = function(e) {
        try {
            const rawBufferData = new Uint8Array(e.target.result); 
            const workbookMatrixInstance = XLSX.read(rawBufferData, { type: 'array' });
            const dynamicTargetSheetName = workbookMatrixInstance.SheetNames[0]; 
            const worksheetGridObject = workbookMatrixInstance.Sheets[dynamicTargetSheetName];
            const matrixJsonGridRows = XLSX.utils.sheet_to_json(worksheetGridObject, { header: 1 });
            let optimizedEmailColumnIndex = -1; 
            
            window.rawUploadedEmailsArray = [];
            
            if(matrixJsonGridRows.length > 0) {
                const layoutHeaderColumnsRow = matrixJsonGridRows[0];
                for(let colIndex = 0; colIndex < layoutHeaderColumnsRow.length; colIndex++) {
                    const rawCellTextLower = String(layoutHeaderColumnsRow[colIndex]).toLowerCase().trim();
                    if(rawCellTextLower.includes('email') || rawCellTextLower === 'mail' || rawCellTextLower === 'e-mail') { 
                        optimizedEmailColumnIndex = colIndex; 
                        break; 
                    }
                }
                if(optimizedEmailColumnIndex === -1) optimizedEmailColumnIndex = 0;
                for(let rowIndex = 1; rowIndex < matrixJsonGridRows.length; rowIndex++) {
                    const trackingEmailCellValue = matrixJsonGridRows[rowIndex][optimizedEmailColumnIndex];
                    if(trackingEmailCellValue && String(trackingEmailCellValue).includes('@')) { 
                        window.rawUploadedEmailsArray.push(String(trackingEmailCellValue).trim().toLowerCase()); 
                    }
                }
            }
            
            if (typeof applyAntiSpamScrubbingFilter === "function") {
                applyAntiSpamScrubbingFilter();
            }
        } catch (compilationExceptionError) {
            console.error("SheetJS Matrix Parse Pipeline Critical Failure:", compilationExceptionError);
        }
    };
    
    // Read binary asset stream cleanly
    parsingMatrixReaderStream.readAsArrayBuffer(primaryFileBlob);
}

// ==================== DISPATCH HARDWARE EVENT BINDER ====================
// Pure programmatic event listener registration loop that completely clears line 63 anomalies
function deployHardwarePipelineChangeListeners() {
    const hardwareInputNode = document.getElementById('excelFile');
    if (hardwareInputNode) {
        hardwareInputNode.removeEventListener('change', parseAndExtractSpreadsheetData);
        hardwareInputNode.addEventListener('change', parseAndExtractSpreadsheetData);
        console.log("🔒 Programmatic hardware layer reference listeners deployed successfully.");
    } else {
        setTimeout(deployHardwarePipelineChangeListeners, 100);
    }
}

// Attach lifecycle hook programmatically
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deployHardwarePipelineChangeListeners);
} else {
    deployHardwarePipelineChangeListeners();
}

// ==================== PERSISTENT FIELD MEMORY ====================
const STORAGE_KEYS = {
    apiKey:  'optimail_api_key_v1',
    sender:  'optimail_sender_id_v1',
    address: 'optimail_footer_address_v1'
};

function restorePersistedFields() {
    const apiKeyNode  = document.getElementById('apiAuthKey');
    const senderNode  = document.getElementById('senderIdentity');
    const addressNode = document.getElementById('footerAddress');

    if (apiKeyNode  && localStorage.getItem(STORAGE_KEYS.apiKey))    apiKeyNode.value  = localStorage.getItem(STORAGE_KEYS.apiKey);
    if (senderNode  && localStorage.getItem(STORAGE_KEYS.sender))    senderNode.value  = localStorage.getItem(STORAGE_KEYS.sender);
    if (addressNode && localStorage.getItem(STORAGE_KEYS.address))   addressNode.value = localStorage.getItem(STORAGE_KEYS.address);
}

function attachFieldMemoryListeners() {
    const fields = [
        { id: 'apiAuthKey',     key: STORAGE_KEYS.apiKey },
        { id: 'senderIdentity', key: STORAGE_KEYS.sender },
        { id: 'footerAddress',  key: STORAGE_KEYS.address }
    ];
    fields.forEach(({ id, key }) => {
        const node = document.getElementById(id);
        if (node) {
            node.addEventListener('input', () => localStorage.setItem(key, node.value.trim()));
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { restorePersistedFields(); attachFieldMemoryListeners(); });
} else {
    restorePersistedFields();
    attachFieldMemoryListeners();
}

// ==================== TAB 3: OPT-OUT STORAGE REGISTRIES ====================
function saveBlacklistData() {
    const rawInputString = document.getElementById('blacklistInput').value;
    const parsedArray = rawInputString.split(/[\n,]+/).map(item => item.trim().toLowerCase()).filter(item => item.length > 0 && item.includes('@'));
    window.globalSystemBlacklistSet = new Set(parsedArray); 
    localStorage.setItem('optimail_blacklist_v4', JSON.stringify(parsedArray));
    refreshBlacklistUIBoards(); 
    applyAntiSpamScrubbingFilter();
    alert("System Core Memory updated. Total " + parsedArray.length + " addresses locked into local database blacklist successfully.");
}

function refreshBlacklistUIBoards() {
    const totalCount = window.globalSystemBlacklistSet.size; 
    const labelNode = document.getElementById('blacklistTotalLabel');
    if(labelNode) labelNode.innerText = `${totalCount} Registered Targets`;
    const badge = document.getElementById('blacklistBadge');
    
    if(badge) {
        if(totalCount > 0) { 
            badge.innerText = totalCount; 
            badge.classList.remove('hidden'); 
        } else { 
            badge.classList.add('hidden'); 
        }
    }
    
    const displayNode = document.getElementById('blacklistCollectionDisplay');
    if(displayNode) {
        const arrayFromSet = Array.from(window.globalSystemBlacklistSet);
        displayNode.innerText = totalCount > 0 ? arrayFromSet.slice(0, 30).join('\n') + (totalCount > 30 ? '\n...and ' + (totalCount - 30) + ' more records' : '') : "No active opt-outs recorded.";
    }
}

function applyAntiSpamScrubbingFilter() {
    if(!window.rawUploadedEmailsArray || window.rawUploadedEmailsArray.length === 0) return;
    
    window.scrubbedFilteredEmailsArray = window.rawUploadedEmailsArray.filter(email => !window.globalSystemBlacklistSet.has(email));
    const totalRemovedScrubCount = window.rawUploadedEmailsArray.length - window.scrubbedFilteredEmailsArray.length;
    const feedbackBox = document.getElementById('scrubFeedbackBox');
    
    if(totalRemovedScrubCount > 0) {
        document.getElementById('scrubFeedbackText').innerText = `Security scrubbing match: ${totalRemovedScrubCount} blacklisted email(s) filtered out completely.`;
        feedbackBox.classList.remove('hidden');
    } else { 
        feedbackBox.classList.add('hidden'); 
    }
    
    document.getElementById('listMetaStatus').classList.remove('hidden');
    document.getElementById('totalTargetCount').innerText = `${window.scrubbedFilteredEmailsArray.length} Clean Contacts`;
    document.getElementById('finalTargetDisplay').innerText = `${window.scrubbedFilteredEmailsArray.length} Profiles Cleared`;
    document.getElementById('sampleEmailsList').innerText = window.scrubbedFilteredEmailsArray.slice(0, 15).join('\n') + (window.scrubbedFilteredEmailsArray.length > 15 ? '\n...and ' + (window.scrubbedFilteredEmailsArray.length - 15) + ' more profiles' : '');
}

// ==================== TAB 4: NETWORK TRANSMISSION ENGINE ====================
async function executeBulkBlastTransmission() {
    const apiAuthToken = document.getElementById('apiAuthKey').value.trim(); 
    const verifiedSenderId = document.getElementById('senderIdentity').value.trim(); 
    const subjectTextLine = document.getElementById('subjectLine').value.trim();
    const consoleWrapper = document.getElementById('dispatchConsoleLog'); 
    const consoleText = document.getElementById('consoleTextOutput'); 
    const consoleBar = document.getElementById('consoleProgressBar');
    const consoleStatus = document.getElementById('consoleStatusLabel'); 
    const blastBtn = document.getElementById('blastTriggerBtn');
    
    if(!apiAuthToken || !verifiedSenderId) { alert("Core configuration arguments missing. Provide API Credentials before firing."); return; }
    if(!window.scrubbedFilteredEmailsArray || window.scrubbedFilteredEmailsArray.length === 0) { alert("Clean Audience list contains 0 entries. Drop a valid Excel file in Tab 2."); return; }
    
    const safetyGuardChecked = confirm(`CRITICAL VERIFICATION BLAST CHECK:\n\nYou are deployment clearing a loop transmission blast for exactly ${window.scrubbedFilteredEmailsArray.length} scrubbed clean recipient records.\n\nDo you authorize pipeline transmission execution?`);
    if(!safetyGuardChecked) return;

    blastBtn.disabled = true; blastBtn.innerText = "⚡ EXECUTING TRANSMISSION GRIDS...";
    consoleWrapper.classList.remove('hidden'); consoleText.innerHTML = ""; consoleBar.style.width = "0%";
    consoleStatus.className = "text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold animate-pulse"; consoleStatus.innerText = "DISPATCHING CAMPAIGN NODE";

    const payloadLayoutCodeContent = generateCompiledEmailHtmlBodySource(); 
    const chunkPacketGroupStepSize = 100; 
    let finalDispatchedEmailCounter = 0;
    appendLogLine(`[PIPELINE READY] Target arrays checked... Active Blacklist Registry has scrubbed out all matching opt-outs successfully.`);

    for(let blockIndex = 0; blockIndex < window.scrubbedFilteredEmailsArray.length; blockIndex += chunkPacketGroupStepSize) {
        const chunkSliceTargetVectorArray = window.scrubbedFilteredEmailsArray.slice(blockIndex, blockIndex + chunkPacketGroupStepSize);
        appendLogLine(`Transmitting sub-packet matrix block range [${blockIndex + 1} - ${Math.min(blockIndex + chunkPacketGroupStepSize, window.scrubbedFilteredEmailsArray.length)}] out to Resend...`);
        try {
            const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.resend.com/emails'), {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiAuthToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: verifiedSenderId, to: chunkSliceTargetVectorArray, subject: subjectTextLine, html: payloadLayoutCodeContent })
            });
            const jsonResponseResult = await response.json();
            if(response.ok) {
                finalDispatchedEmailCounter += chunkSliceTargetVectorArray.length; 
                const completePercentRatio = Math.round((finalDispatchedEmailCounter / window.scrubbedFilteredEmailsArray.length) * 100);
                consoleBar.style.width = `${completePercentRatio}%`; 
                appendLogLine(`✅ Sub-Packet chunk verified. Server Token ID: ${jsonResponseResult.id}`);
            } else { 
                throw new Error(jsonResponseResult.message || "Endpoint server error response."); 
            }
        } catch (apiErrorConnectionException) { 
            appendLogLine(`❌ PIPELINE EXCEPTION ERROR: ${apiErrorConnectionException.message}`); 
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    blastBtn.disabled = false; blastBtn.innerText = "⚡ INITIALIZE COMPLIANT COURIER DISPATCH BLAST";
    consoleStatus.className = "text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold"; consoleStatus.innerText = "TRANSFER FINISHED";
    appendLogLine(`[COURIER OVERVIEW COMPLETE] System loops closed safely. Total ${finalDispatchedEmailCounter} recipient mailboxes updated.`);
}

function appendLogLine(logTextString) { 
    const consoleText = document.getElementById('consoleTextOutput'); 
    if(!consoleText) return;
    const timeMark = new Date().toLocaleTimeString(); 
    consoleText.innerHTML += `<div><span class="text-slate-600">[${timeMark}]</span> ${logTextString}</div>`; 
    consoleText.scrollTop = consoleText.scrollHeight; 
}