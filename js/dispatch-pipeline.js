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
            
            // Dedup — silently remove duplicate addresses
            const beforeDedupCount = window.rawUploadedEmailsArray.length;
            window.rawUploadedEmailsArray = [...new Set(window.rawUploadedEmailsArray)];
            const dedupRemovedCount = beforeDedupCount - window.rawUploadedEmailsArray.length;

            // Show dedup notice banner in Tab 4 if duplicates were found
            const dedupBanner = document.getElementById('dedupNoticeBanner');
            const dedupText   = document.getElementById('dedupNoticeText');
            if (dedupBanner && dedupText) {
                if (dedupRemovedCount > 0) {
                    dedupText.innerText = `${dedupRemovedCount} duplicate email${dedupRemovedCount > 1 ? 's' : ''} removed automatically from your list.`;
                    dedupBanner.classList.remove('hidden');
                } else {
                    dedupBanner.classList.add('hidden');
                }
            }
            if (dedupRemovedCount > 0) console.log(`🧹 Dedup pass removed ${dedupRemovedCount} duplicate address(es).`);

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
    if (senderNode  && localStorage.getItem(STORAGE_KEYS.sender)) {
        senderNode.value = localStorage.getItem(STORAGE_KEYS.sender);
        updateSenderDomainHint(senderNode.value);
    }
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
            node.addEventListener('input', () => {
                localStorage.setItem(key, node.value.trim());
                // Live domain hint on sender field
                if (id === 'senderIdentity') updateSenderDomainHint(node.value.trim());
            });
        }
    });
}

function updateSenderDomainHint(email) {
    const hint = document.getElementById('senderDomainHint');
    if (!hint) return;
    const knownPlaceholders = ['yourboutique.com', 'yourstore.com', 'example.com', 'test.com', 'domain.com'];
    const domain = (email.split('@')[1] || '').toLowerCase();
    const showHint = domain.length > 0 && knownPlaceholders.includes(domain);
    hint.classList.toggle('hidden', !showHint);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { restorePersistedFields(); attachFieldMemoryListeners(); });
} else {
    restorePersistedFields();
    attachFieldMemoryListeners();
}

// ==================== CAMPAIGN STATE MANAGER ====================
// Persists the full email list, sent addresses, and daily count across browser sessions.
// Client can close the browser and resume exactly where they left off the next day.

const CAMPAIGN_KEY = 'optimail_campaign_v1';
const DAILY_CAP    = 100;

function saveCampaignState() {
    const state = {
        fullList:  window.scrubbedFilteredEmailsArray  || [],
        sentList:  window.campaignSentSet ? Array.from(window.campaignSentSet) : [],
        date:      new Date().toDateString(),
        sentToday: window.campaignSentToday || 0
    };
    localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(state));
}

function loadCampaignState() {
    try {
        const raw = localStorage.getItem(CAMPAIGN_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch(e) { return null; }
}

function clearCampaignState() {
    localStorage.removeItem(CAMPAIGN_KEY);
    window.campaignSentSet   = new Set();
    window.campaignSentToday = 0;
    window.scrubbedFilteredEmailsArray = [];
    hideCampaignBanner();
    updateCampaignStatusBar();
}

function downloadProgressReport() {
    const full    = window.scrubbedFilteredEmailsArray || [];
    const sent    = window.campaignSentSet || new Set();
    const state   = loadCampaignState();
    const dateStr = state ? state.date : new Date().toDateString();

    if (full.length === 0) {
        alert('No campaign data to export. Upload a list and run a send first.');
        return;
    }

    const rows = ['Email,Status,Campaign Date'];
    full.forEach(email => {
        const status = sent.has(email) ? 'Sent' : 'Pending';
        rows.push(`${email},${status},${dateStr}`);
    });

    // Add any pending emails not in full list (edge case safety)
    const csv  = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `optimail-campaign-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// How many can go out right now (respects daily cap, resets if new day)
function getRemainingCapToday(state) {
    const today = new Date().toDateString();
    if (state && state.date === today) {
        return Math.max(0, DAILY_CAP - (state.sentToday || 0));
    }
    return DAILY_CAP; // new day — full cap available
}

function getPendingEmails() {
    const full = window.scrubbedFilteredEmailsArray || [];
    const sent = window.campaignSentSet || new Set();
    return full.filter(e => !sent.has(e));
}

// ── Campaign status bar (shown in Tab 4 above blast button) ─────────────────
function updateCampaignStatusBar() {
    const bar = document.getElementById('campaignStatusBar');
    if (!bar) return;

    const pending    = getPendingEmails();
    const sent       = window.campaignSentSet ? window.campaignSentSet.size : 0;
    const total      = (window.scrubbedFilteredEmailsArray || []).length;
    const sentToday  = window.campaignSentToday || 0;
    const capLeft    = Math.max(0, DAILY_CAP - sentToday);
    const canSendNow = Math.min(pending.length, capLeft);

    if (total === 0) { bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');

    document.getElementById('csb-total').innerText    = total;
    document.getElementById('csb-sent').innerText     = sent;
    document.getElementById('csb-pending').innerText  = pending.length;
    document.getElementById('csb-today').innerText    = sentToday;
    document.getElementById('csb-capleft').innerText  = capLeft;
    document.getElementById('csb-cannow').innerText   = canSendNow;

    const pct = total > 0 ? Math.round((sent / total) * 100) : 0;
    document.getElementById('csb-bar').style.width = `${pct}%`;
    document.getElementById('csb-pct').innerText   = `${pct}%`;

    // Cooldown warning if daily cap hit
    const cooldown = document.getElementById('csb-cooldown');
    if (cooldown) cooldown.classList.toggle('hidden', capLeft > 0);

    // Done banner if all sent
    const done = document.getElementById('csb-done');
    if (done) done.classList.toggle('hidden', pending.length > 0);
}

// ── Resume banner — shown on page load if unfinished campaign found ──────────
function checkAndShowResumeBanner() {
    const state = loadCampaignState();
    if (!state || !state.fullList || state.fullList.length === 0) return;

    const today      = new Date().toDateString();
    const isNewDay   = state.date !== today;
    const sentSet    = new Set(state.sentList || []);
    const pending    = state.fullList.filter(e => !sentSet.has(e));

    if (pending.length === 0) return; // all done, nothing to resume

    // Restore into memory
    window.scrubbedFilteredEmailsArray = state.fullList;
    window.campaignSentSet   = sentSet;
    window.campaignSentToday = isNewDay ? 0 : (state.sentToday || 0);

    const banner   = document.getElementById('resumeCampaignBanner');
    const msgEl    = document.getElementById('resumeBannerMsg');
    const capLeft  = getRemainingCapToday({ date: today, sentToday: window.campaignSentToday });

    if (banner && msgEl) {
        if (isNewDay) {
            msgEl.innerText = `New day — ${pending.length} emails still pending from your last campaign. You can send up to ${capLeft} today.`;
        } else {
            msgEl.innerText = `${pending.length} emails still pending. ${capLeft} sends remaining today before the daily limit.`;
        }
        banner.classList.remove('hidden');
    }

    updateCampaignStatusBar();
    // Update the target display so Tab 4 summary reflects restored state
    const finalDisplay = document.getElementById('finalTargetDisplay');
    if (finalDisplay) finalDisplay.innerText = `${state.fullList.length} Profiles Loaded`;
}

function hideCampaignBanner() {
    const banner = document.getElementById('resumeCampaignBanner');
    if (banner) banner.classList.add('hidden');
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndShowResumeBanner);
} else {
    checkAndShowResumeBanner();
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

    // Fresh upload — reset sent tracking and save new list to campaign state
    window.campaignSentSet   = new Set();
    window.campaignSentToday = 0;
    saveCampaignState();
    hideCampaignBanner();
    updateCampaignStatusBar();
}

// ==================== TAB 4: NETWORK TRANSMISSION ENGINE ====================

// ── Shared helpers ──────────────────────────────────────────────────────────
function getDispatchCredentials() {
    return {
        apiAuthToken:     document.getElementById('apiAuthKey').value.trim(),
        verifiedSenderId: document.getElementById('senderIdentity').value.trim(),
        subjectTextLine:  document.getElementById('subjectLine').value.trim()
    };
}

function validateSenderDomain(senderEmail) {
    // Warn when the domain looks like a placeholder — unverified domains will be rejected by Resend
    const knownPlaceholderDomains = ['yourboutique.com', 'yourstore.com', 'example.com', 'test.com', 'domain.com'];
    const senderDomain = senderEmail.split('@')[1] || '';
    if (knownPlaceholderDomains.includes(senderDomain.toLowerCase())) {
        return `⚠️ Warning: "${senderDomain}" looks like it may not be verified in your Resend account. Sending will fail if this domain isn't verified. Continue anyway?`;
    }
    return null;
}

function openConsolePanel(consoleWrapper, consoleText, consoleBar, consoleStatus) {
    consoleWrapper.classList.remove('hidden');
    consoleText.innerHTML = '';
    consoleBar.style.width = '0%';
    consoleStatus.className = 'text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold animate-pulse';
    consoleStatus.innerText = 'DISPATCHING';
}

// ── Send test email to self ──────────────────────────────────────────────────
async function sendTestEmailToSelf() {
    const { apiAuthToken, verifiedSenderId, subjectTextLine } = getDispatchCredentials();
    const testBtn = document.getElementById('testSelfBtn');

    if (!apiAuthToken || !verifiedSenderId) {
        alert('Enter your Resend API key and sender email address before sending a test.');
        return;
    }

    // Domain check
    const domainWarning = validateSenderDomain(verifiedSenderId);
    if (domainWarning && !confirm(domainWarning)) return;

    const consoleWrapper = document.getElementById('dispatchConsoleLog');
    const consoleText    = document.getElementById('consoleTextOutput');
    const consoleBar     = document.getElementById('consoleProgressBar');
    const consoleStatus  = document.getElementById('consoleStatusLabel');

    testBtn.disabled = true;
    testBtn.innerText = '📨 Sending test...';
    openConsolePanel(consoleWrapper, consoleText, consoleBar, consoleStatus);
    appendLogLine(`[TEST MODE] Firing single test email → ${verifiedSenderId}`);

    try {
        const payloadHtml = generateCompiledEmailHtmlBodySource();
        const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.resend.com/emails'), {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiAuthToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: verifiedSenderId, to: [verifiedSenderId], subject: `[TEST] ${subjectTextLine}`, html: payloadHtml })
        });
        const result = await response.json();
        if (response.ok) {
            consoleBar.style.width = '100%';
            consoleStatus.className = 'text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold';
            consoleStatus.innerText = 'TEST SENT';
            appendLogLine(`✅ Test email delivered. Resend ID: ${result.id}`);
            appendLogLine(`[TEST COMPLETE] Check ${verifiedSenderId} inbox — subject line prefixed with [TEST].`);
        } else {
            throw new Error(result.message || 'Resend API rejected the request.');
        }
    } catch (err) {
        appendLogLine(`❌ TEST FAILED: ${err.message}`);
        consoleStatus.className = 'text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-mono font-bold';
        consoleStatus.innerText = 'TEST ERROR';
    }

    testBtn.disabled = false;
    testBtn.innerText = '📨 Send Test to Myself';
}

// ── Full blast using Resend batch API (true 1-to-1 sends) ───────────────────
async function executeBulkBlastTransmission() {
    const { apiAuthToken, verifiedSenderId, subjectTextLine } = getDispatchCredentials();
    const consoleWrapper = document.getElementById('dispatchConsoleLog');
    const consoleText    = document.getElementById('consoleTextOutput');
    const consoleBar     = document.getElementById('consoleProgressBar');
    const consoleStatus  = document.getElementById('consoleStatusLabel');
    const blastBtn       = document.getElementById('blastTriggerBtn');

    if (!apiAuthToken || !verifiedSenderId) {
        alert('Core configuration arguments missing. Provide API Credentials before firing.');
        return;
    }
    if (!window.scrubbedFilteredEmailsArray || window.scrubbedFilteredEmailsArray.length === 0) {
        alert('No email list loaded. Upload an Excel file in Tab 2 first.');
        return;
    }

    // Initialise campaign tracking if not already set
    if (!window.campaignSentSet)   window.campaignSentSet   = new Set();
    if (!window.campaignSentToday) window.campaignSentToday = 0;

    // Check daily cap — reset count if it's a new day
    const state   = loadCampaignState();
    const today   = new Date().toDateString();
    if (state && state.date !== today) window.campaignSentToday = 0;

    const capLeft = Math.max(0, DAILY_CAP - window.campaignSentToday);
    if (capLeft === 0) {
        alert(`Daily sending limit of ${DAILY_CAP} emails reached for today.\n\nCome back tomorrow — your remaining ${getPendingEmails().length} contacts are saved and will be ready to continue.`);
        return;
    }

    const pending = getPendingEmails();
    if (pending.length === 0) {
        alert('All emails in this campaign have already been sent. Use Reset Campaign to start a new one.');
        return;
    }

    // Only send up to what the daily cap allows
    const toSendNow = pending.slice(0, capLeft);

    const domainWarning = validateSenderDomain(verifiedSenderId);
    if (domainWarning && !confirm(domainWarning)) return;

    const confirmed = confirm(
        `CAMPAIGN SEND CONFIRMATION\n\n` +
        `Sending today:     ${toSendNow.length} emails\n` +
        `Already sent:      ${window.campaignSentSet.size}\n` +
        `Still pending:     ${pending.length - toSendNow.length} (after today)\n` +
        `Daily cap:         ${DAILY_CAP}/day\n\n` +
        `Each recipient gets an individual email.\nAuthorise?`
    );
    if (!confirmed) return;

    blastBtn.disabled = true;
    blastBtn.innerText = '⚡ SENDING...';
    openConsolePanel(consoleWrapper, consoleText, consoleBar, consoleStatus);
    consoleStatus.innerText = 'DISPATCHING';

    const payloadHtml  = generateCompiledEmailHtmlBodySource();
    const BATCH_SIZE   = 100;
    let   totalSent    = 0;
    let   totalFailed  = 0;

    appendLogLine(`[CAMPAIGN] ${toSendNow.length} emails queued for today. ${pending.length - toSendNow.length} will carry over to tomorrow.`);

    for (let i = 0; i < toSendNow.length; i += BATCH_SIZE) {
        const chunk = toSendNow.slice(i, i + BATCH_SIZE);

        const batchPayload = chunk.map(email => ({
            from: verifiedSenderId, to: [email], subject: subjectTextLine, html: payloadHtml
        }));

        appendLogLine(`Dispatching [${i + 1}–${Math.min(i + BATCH_SIZE, toSendNow.length)}]...`);

        try {
            const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.resend.com/emails/batch'), {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiAuthToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(batchPayload)
            });
            const result = await response.json();

            if (response.ok) {
                const successes = (result.data || []).filter(r => r.id).length;
                const failures  = chunk.length - successes;
                totalSent   += successes;
                totalFailed += failures;

                // Mark successfully sent addresses in the campaign state
                chunk.slice(0, successes).forEach(e => window.campaignSentSet.add(e));
                window.campaignSentToday += successes;

                // Save progress to localStorage after every batch
                saveCampaignState();
                updateCampaignStatusBar();

                const pct = Math.round((window.campaignSentSet.size / window.scrubbedFilteredEmailsArray.length) * 100);
                consoleBar.style.width = `${pct}%`;
                appendLogLine(`✅ ${successes} sent${failures > 0 ? `, ⚠️ ${failures} failed` : ''}. Overall progress: ${pct}% (${window.campaignSentSet.size}/${window.scrubbedFilteredEmailsArray.length})`);
            } else {
                throw new Error(result.message || 'Resend returned an error.');
            }
        } catch (err) {
            totalFailed += chunk.length;
            appendLogLine(`❌ BATCH ERROR: ${err.message}`);
        }

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    blastBtn.disabled = false;
    blastBtn.innerText = '⚡ INITIALIZE COMPLIANT COURIER DISPATCH BLAST';
    consoleStatus.className = 'text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold';
    consoleStatus.innerText = 'SESSION COMPLETE';

    const stillPending = getPendingEmails().length;
    if (stillPending > 0) {
        appendLogLine(`[SESSION DONE] ✅ ${totalSent} sent today. 📋 ${stillPending} contacts saved — come back tomorrow to continue.`);
        hideCampaignBanner();
    } else {
        appendLogLine(`[CAMPAIGN COMPLETE] ✅ All ${window.campaignSentSet.size} contacts reached. Use Reset Campaign to start fresh.`);
        consoleStatus.innerText = 'CAMPAIGN COMPLETE';
    }
    if (totalFailed > 0) appendLogLine(`⚠️ ${totalFailed} failed sends — check your Resend dashboard.`);

    updateCampaignStatusBar();
}

function appendLogLine(logTextString) { 
    const consoleText = document.getElementById('consoleTextOutput'); 
    if(!consoleText) return;
    const timeMark = new Date().toLocaleTimeString(); 
    consoleText.innerHTML += `<div><span class="text-slate-600">[${timeMark}]</span> ${logTextString}</div>`; 
    consoleText.scrollTop = consoleText.scrollHeight; 
}
