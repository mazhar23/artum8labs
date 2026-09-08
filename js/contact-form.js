/**
 * Artum8 Labs - Contact & Inquiry Form Handler
 * Dispatches inquiries directly to mazharkhan@programmer.net via FormSubmit AJAX endpoint.
 */

(function () {
    const TARGET_EMAIL = 'mazharkhan@programmer.net';

    function setupForm(form) {
        if (form.dataset.inquiryInitialized === 'true') return;
        form.dataset.inquiryInitialized = 'true';

        // Find or create status message container
        let statusDiv = form.querySelector('.form-status-msg');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.className = 'form-status-msg hidden rounded-xl p-4 text-sm font-medium transition-all duration-300';
            form.appendChild(statusDiv);
        }

        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!submitBtn) return;
            const originalBtnHtml = submitBtn.innerHTML;

            // Gather form fields
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Build human-friendly subject
            const senderName = (data.firstName && data.lastName) 
                ? `${data.firstName} ${data.lastName}` 
                : (data.name || data.firstName || data.email || 'Visitor');
            const companyTag = data.company ? ` (${data.company})` : '';
            const serviceTag = data.service || data.industry || 'Project Inquiry';

            const subject = `[Artum8 Labs] New Inquiry from ${senderName}${companyTag} - ${serviceTag}`;

            // Button loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="inline-flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmitting to Mazhar Khan...</span>
                </span>
            `;

            statusDiv.className = 'form-status-msg hidden';

            try {
                const payload = {
                    ...data,
                    _subject: subject,
                    _replyto: data.email,
                    _template: 'table',
                    _captcha: 'false',
                    _url: window.location.href,
                    recipient: TARGET_EMAIL,
                    submitted_at: new Date().toLocaleString()
                };

                const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok || result.success === 'true' || result.success === true) {
                    submitBtn.innerHTML = `✓ Inquiry Received!`;
                    submitBtn.classList.remove('btn-primary', 'bg-orange-600');
                    submitBtn.classList.add('bg-emerald-600', 'text-white');

                    statusDiv.className = 'form-status-msg block mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm animate-fadeIn';
                    statusDiv.innerHTML = `
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                            <div>
                                <p class="font-semibold text-white">Inquiry Sent to Mazhar Khan!</p>
                                <p class="text-emerald-200/90 text-xs mt-1">
                                    Your project details have been dispatched to <strong>${TARGET_EMAIL}</strong>. Our engineering team will review your scope and get back to you within 24 hours.
                                </p>
                            </div>
                        </div>
                    `;

                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnHtml;
                        submitBtn.disabled = false;
                        submitBtn.classList.add('btn-primary');
                        submitBtn.classList.remove('bg-emerald-600', 'text-white');
                    }, 6000);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (err) {
                console.error('Inquiry submission error:', err);

                submitBtn.innerHTML = `Submission Failed - Retry`;
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('bg-red-600', 'text-white');

                statusDiv.className = 'form-status-msg block mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm animate-fadeIn';
                statusDiv.innerHTML = `
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                        <div>
                            <p class="font-semibold text-white">Network issue dispatching form.</p>
                            <p class="text-red-200/90 text-xs mt-1">
                                Please email your inquiry directly to <a href="mailto:${TARGET_EMAIL}?subject=Artum8%20Labs%20Project%20Inquiry" class="text-accent underline font-semibold">${TARGET_EMAIL}</a>.
                            </p>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('btn-primary');
                    submitBtn.classList.remove('bg-red-600', 'text-white');
                }, 5000);
            }
        });
    }

    function initAllForms() {
        document.querySelectorAll('form').forEach(setupForm);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllForms);
    } else {
        initAllForms();
    }

    window.Artum8Inquiry = {
        init: initAllForms,
        setupForm: setupForm,
        targetEmail: TARGET_EMAIL
    };
})();
