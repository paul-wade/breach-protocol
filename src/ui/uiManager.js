// UI Manager - User Interface Management
// Handles UI interactions, feedback, and modal management

export class UIManager {
    constructor() {
        this.activeModals = new Set();
        this.feedbackQueue = [];
        this.currentTheme = 'light';
        
        this.init();
    }

    init() {
        console.log('UIManager initialized');
        this.setupEventListeners();
        this.initializeAccessibility();
    }

    setupEventListeners() {
        // Modal close handlers
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
                this.hideModal(event.target.id);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeTopModal();
            }
        });

        // Settings handlers
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }
    }

    initializeAccessibility() {
        // Add screen reader support
        const srOnlyStyle = document.createElement('style');
        srOnlyStyle.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(srOnlyStyle);
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.activeModals.add(modalId);
            
            // Focus management
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            this.activeModals.delete(modalId);
            
            // Restore body scroll if no active modals
            if (this.activeModals.size === 0) {
                document.body.style.overflow = '';
            }
        }
    }

    closeTopModal() {
        if (this.activeModals.size > 0) {
            const topModal = Array.from(this.activeModals).pop();
            this.hideModal(topModal);
        }
    }

    // Feedback System
    showFeedback(feedback) {
        if (!feedback) return;
        
        const feedbackElement = this.createFeedbackElement(feedback);
        this.displayFeedback(feedbackElement);
        
        // Auto-remove after delay
        setTimeout(() => {
            this.removeFeedback(feedbackElement);
        }, 5000);
    }

    createFeedbackElement(feedback) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback-message ${feedback.type}`;
        
        feedbackDiv.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-header">
                    <h4>${feedback.title}</h4>
                    <button class="close-btn" onclick="this.closest('.feedback-message').remove()">&times;</button>
                </div>
                <div class="feedback-body">
                    <p>${feedback.message}</p>
                    
                    ${feedback.learningPoints && feedback.learningPoints.length > 0 ? `
                        <div class="learning-points">
                            <h5>Key Learning Points:</h5>
                            <ul>
                                ${feedback.learningPoints.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${feedback.nextSteps && feedback.nextSteps.length > 0 ? `
                        <div class="next-steps">
                            <h5>Next Steps:</h5>
                            <ul>
                                ${feedback.nextSteps.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        return feedbackDiv;
    }

    displayFeedback(feedbackElement) {
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            aiOutput.appendChild(feedbackElement);
            aiOutput.scrollTop = aiOutput.scrollHeight;
        }
    }

    removeFeedback(feedbackElement) {
        if (feedbackElement && feedbackElement.parentNode) {
            feedbackElement.style.opacity = '0';
            feedbackElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                feedbackElement.remove();
            }, 300);
        }
    }

    // Scenario Display Management
    updateScenarioDisplay(scenarioData) {
        if (!scenarioData) return;
        
        // Update title
        const titleElement = document.getElementById('scenario-title');
        if (titleElement) {
            titleElement.textContent = scenarioData.title;
        }
        
        // Update description
        const descriptionElement = document.getElementById('scenario-description');
        if (descriptionElement) {
            descriptionElement.innerHTML = `
                <div class="scenario-text">
                    <p>${scenarioData.description}</p>
                </div>
            `;
        }
        
        // Update progress
        const progressElement = document.querySelector('.progress-fill');
        if (progressElement) {
            progressElement.style.width = `${scenarioData.progress}%`;
        }
        
        this.addEducationalContext(scenarioData);
    }

    addEducationalContext(scenarioData) {
        const contextDiv = document.createElement('div');
        contextDiv.className = 'educational-context';
        contextDiv.innerHTML = `
            <div class="educational-focus">
                <h4>🎓 Educational Context</h4>
                <p>This scenario is designed to teach AI safety principles through interactive decision-making.</p>
                <p><strong>Remember:</strong> Focus on learning about human oversight, risk assessment, and AI alignment.</p>
            </div>
        `;
        
        const scenarioContent = document.querySelector('.scenario-content');
        if (scenarioContent) {
            scenarioContent.insertBefore(contextDiv, scenarioContent.firstChild);
        }
    }

    // Settings Management
    showSettings() {
        const settingsModal = this.createSettingsModal();
        document.body.appendChild(settingsModal);
        this.showModal(settingsModal.id);
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'settings-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Settings</h2>
                    <button class="close-btn" data-modal="settings-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="settings-section">
                        <h3>Educational Preferences</h3>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="show-hints" checked>
                                Show educational hints
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="detailed-feedback" checked>
                                Provide detailed feedback
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="learning-objectives" checked>
                                Display learning objectives
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h3>Accessibility</h3>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="high-contrast">
                                High contrast mode
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="reduced-motion">
                                Reduce motion
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                Font size:
                                <select id="font-size">
                                    <option value="small">Small</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h3>Privacy & Data</h3>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="educational-analytics" checked>
                                Allow educational analytics (helps improve the simulation)
                            </label>
                        </div>
                        <div class="setting-item">
                            <button class="btn btn-secondary" id="export-progress">
                                Export Learning Progress
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for settings
        modal.addEventListener('change', (event) => {
            this.handleSettingChange(event.target);
        });
        
        return modal;
    }

    handleSettingChange(element) {
        const setting = element.id;
        const value = element.type === 'checkbox' ? element.checked : element.value;
        
        console.log(`Setting changed: ${setting} = ${value}`);
        
        // Apply setting changes
        switch (setting) {
            case 'high-contrast':
                document.body.classList.toggle('high-contrast', value);
                break;
            case 'reduced-motion':
                document.body.classList.toggle('reduced-motion', value);
                break;
            case 'font-size':
                document.body.className = document.body.className.replace(/font-size-\w+/g, '');
                document.body.classList.add(`font-size-${value}`);
                break;
            case 'show-hints':
                document.body.classList.toggle('show-hints', value);
                break;
            case 'detailed-feedback':
                document.body.classList.toggle('detailed-feedback', value);
                break;
            case 'learning-objectives':
                document.body.classList.toggle('show-objectives', value);
                break;
        }
        
        // Save setting to localStorage
        this.saveSetting(setting, value);
    }

    saveSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        localStorage.setItem('breachProtocolSettings', JSON.stringify(settings));
    }

    getSettings() {
        const stored = localStorage.getItem('breachProtocolSettings');
        return stored ? JSON.parse(stored) : {};
    }

    loadSettings() {
        const settings = this.getSettings();
        
        Object.entries(settings).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
                this.handleSettingChange(element);
            }
        });
    }

    // Progress and Completion
    updateProgress(progress) {
        const progressElement = document.getElementById('learning-progress');
        if (progressElement) {
            progressElement.textContent = `Learning Progress: ${Math.round(progress)}%`;
        }
        
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    showCompletion(completionData) {
        const completionModal = this.createCompletionModal(completionData);
        document.body.appendChild(completionModal);
        this.showModal(completionModal.id);
    }

    createCompletionModal(data) {
        const modal = document.createElement('div');
        modal.id = 'completion-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🎓 Educational Simulation Complete!</h2>
                </div>
                <div class="modal-body">
                    <div class="completion-summary">
                        <h3>Your Learning Journey</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-value">${data.safetyScore}</div>
                                <div class="stat-label">Safety Score</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${data.oversightActions}</div>
                                <div class="stat-label">Oversight Actions</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${Math.round(data.progress)}%</div>
                                <div class="stat-label">Progress</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="learning-outcomes">
                        <h3>Key Learning Outcomes</h3>
                        <ul>
                            <li>✅ Understanding of AI safety principles</li>
                            <li>✅ Importance of human oversight</li>
                            <li>✅ Risk assessment skills</li>
                            <li>✅ AI alignment awareness</li>
                        </ul>
                    </div>
                    
                    <div class="next-steps">
                        <h3>Continue Your Learning</h3>
                        <p>This simulation is just the beginning. Continue exploring AI safety through:</p>
                        <ul>
                            <li>Academic research papers</li>
                            <li>AI safety organizations</li>
                            <li>Community discussions</li>
                            <li>Real-world case studies</li>
                        </ul>
                    </div>
                    
                    <div class="completion-actions">
                        <button class="btn btn-primary" id="export-certificate">
                            Download Certificate
                        </button>
                        <button class="btn btn-secondary" id="restart-simulation">
                            Restart Simulation
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for completion actions
        modal.addEventListener('click', (event) => {
            if (event.target.id === 'export-certificate') {
                this.exportCertificate(data);
            } else if (event.target.id === 'restart-simulation') {
                this.restartSimulation();
            }
        });
        
        return modal;
    }

    exportCertificate(data) {
        const certificate = {
            title: 'AI Safety Educational Simulation Certificate',
            recipient: 'Simulation Participant',
            date: new Date().toLocaleDateString(),
            completion: `${Math.round(data.progress)}%`,
            safetyScore: data.safetyScore,
            oversightActions: data.oversightActions,
            educationalNote: 'This certificate demonstrates completion of educational scenarios focused on AI safety, human oversight, and risk assessment.'
        };
        
        // Create downloadable JSON
        const dataStr = JSON.stringify(certificate, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'ai-safety-certificate.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    restartSimulation() {
        if (confirm('Are you sure you want to restart the simulation? This will reset all progress.')) {
            localStorage.removeItem('breachProtocolProgress');
            location.reload();
        }
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-btn" onclick="this.closest('.notification').remove()">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
    }

    // Public API
    getActiveModals() {
        return Array.from(this.activeModals);
    }

    isModalActive(modalId) {
        return this.activeModals.has(modalId);
    }

    clearAllFeedback() {
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            const feedbackElements = aiOutput.querySelectorAll('.feedback-message');
            feedbackElements.forEach(element => element.remove());
        }
    }
} 