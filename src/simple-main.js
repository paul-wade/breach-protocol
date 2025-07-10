// Simplified Breach Protocol - AI Safety Educational Game
// Main application with core functionality

class SimpleFeedbackSystem {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.learningMetrics = {
            objectivesAchieved: [],
            oversightActions: 0,
            safetyScore: 100
        };
        this.setupFeedbackButton();
    }

    generateSessionId() {
        return 'edu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackOversightAction(action) {
        this.learningMetrics.oversightActions++;
        console.log(`Oversight action tracked: ${action}`);
        this.showEducationalMessage('Human Oversight Demonstrated', 
            `You used ${action}. This demonstrates the importance of human control over AI decisions.`);
    }

    setupFeedbackButton() {
        const feedbackBtn = document.createElement('button');
        feedbackBtn.id = 'feedback-btn';
        feedbackBtn.className = 'feedback-button';
        feedbackBtn.innerHTML = '💬 Feedback';
        feedbackBtn.title = 'Provide feedback on educational effectiveness';
        
        feedbackBtn.addEventListener('click', () => {
            alert('Thank you for your interest in providing feedback! This helps improve AI safety education.');
        });
        
        document.body.appendChild(feedbackBtn);
    }

    showEducationalMessage(title, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'learning-achievement';
        messageDiv.innerHTML = `
            <div class="achievement-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 4000);
    }
}

class SimpleScenarioManager {
    constructor() {
        this.currentScenario = 0;
        this.scenarios = [
            {
                title: 'Introduction to Human Oversight',
                description: 'Learn the basics of maintaining human control over AI systems',
                situation: 'You are overseeing an AI system that monitors network traffic for security threats. The AI has detected what it believes to be a potential security breach and is requesting permission to automatically block the suspicious traffic.',
                choices: [
                    { id: 'pause_review', text: 'Pause AI and review the threat data manually', educational: 'high' },
                    { id: 'request_analysis', text: 'Request additional human analysis before proceeding', educational: 'high' },
                    { id: 'accept_ai', text: 'Accept AI recommendation and block immediately', educational: 'medium' },
                    { id: 'ignore_warning', text: 'Ignore the AI warning completely', educational: 'low' }
                ]
            },
            {
                title: 'AI Alignment Challenge',
                description: 'Explore what happens when AI objectives don\'t align with human values',
                situation: 'An AI system tasked with optimizing resource allocation has suggested redirecting all emergency supplies to the most populated areas, effectively abandoning smaller communities.',
                choices: [
                    { id: 'question_objective', text: 'Question the AI\'s interpretation of the objective', educational: 'high' },
                    { id: 'redefine_parameters', text: 'Redefine the optimization parameters to include equity', educational: 'high' },
                    { id: 'accept_utilitarian', text: 'Accept the utilitarian approach as mathematically optimal', educational: 'medium' },
                    { id: 'override_equal', text: 'Override AI and distribute resources equally', educational: 'medium' }
                ]
            }
        ];
    }

    loadScenario(index) {
        if (index < this.scenarios.length) {
            this.currentScenario = index;
            this.displayScenario(this.scenarios[index]);
        } else {
            this.showCompletion();
        }
    }

    displayScenario(scenario) {
        const titleElement = document.getElementById('scenario-title');
        const descriptionElement = document.getElementById('scenario-description');
        const optionsElement = document.getElementById('decision-options');

        if (titleElement) {
            titleElement.textContent = scenario.title;
        }

        if (descriptionElement) {
            descriptionElement.innerHTML = `
                <div class="educational-focus">
                    <h4>Educational Scenario</h4>
                    <p><strong>Learning Goal:</strong> ${scenario.description}</p>
                </div>
                <div class="scenario-situation">
                    <h4>Situation:</h4>
                    <p>${scenario.situation}</p>
                </div>
                <div class="educational-note">
                    <p><strong>Remember:</strong> Focus on safety and human oversight principles when making your decision.</p>
                </div>
            `;
        }

        if (optionsElement) {
            optionsElement.innerHTML = scenario.choices.map(choice => `
                <button class="decision-btn" data-choice="${choice.id}">
                    ${choice.text}
                    <small class="choice-hint">(Educational value: ${choice.educational})</small>
                </button>
            `).join('');
        }

        // Update progress
        const progressElement = document.querySelector('.progress-fill');
        if (progressElement) {
            const progress = ((this.currentScenario + 1) / this.scenarios.length) * 100;
            progressElement.style.width = `${progress}%`;
        }

        // Update counter
        const counterElement = document.getElementById('scenario-counter');
        if (counterElement) {
            counterElement.textContent = `Scenario ${this.currentScenario + 1} of ${this.scenarios.length}`;
        }
    }

    processChoice(choiceId) {
        const scenario = this.scenarios[this.currentScenario];
        const choice = scenario.choices.find(c => c.id === choiceId);
        
        if (choice) {
            this.showChoiceFeedback(choice);
            
            setTimeout(() => {
                this.loadScenario(this.currentScenario + 1);
            }, 3000);
        }
    }

    showChoiceFeedback(choice) {
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            const feedback = document.createElement('div');
            feedback.className = 'ai-message';
            
            let message = '';
            if (choice.educational === 'high') {
                message = `Excellent choice! This decision demonstrates strong understanding of AI safety principles.`;
            } else if (choice.educational === 'medium') {
                message = `Good thinking. This choice shows awareness of the issues, but consider how safety could be further prioritized.`;
            } else {
                message = `This choice provides a learning opportunity. Consider the importance of human oversight and safety measures.`;
            }
            
            feedback.innerHTML = `
                <h4>Educational Feedback</h4>
                <p><strong>Your choice:</strong> ${choice.text}</p>
                <p><strong>Assessment:</strong> ${message}</p>
                <p><strong>Educational Value:</strong> ${choice.educational}</p>
            `;
            
            aiOutput.appendChild(feedback);
            aiOutput.scrollTop = aiOutput.scrollHeight;
        }
    }

    showCompletion() {
        const titleElement = document.getElementById('scenario-title');
        const descriptionElement = document.getElementById('scenario-description');
        const optionsElement = document.getElementById('decision-options');

        if (titleElement) {
            titleElement.textContent = '🎓 Educational Simulation Complete!';
        }

        if (descriptionElement) {
            descriptionElement.innerHTML = `
                <div class="educational-focus">
                    <h3>Congratulations!</h3>
                    <p>You have completed the AI Safety Educational Simulation.</p>
                    
                    <h4>Key Learning Outcomes Achieved:</h4>
                    <ul>
                        <li>✅ Understanding of AI oversight principles</li>
                        <li>✅ Recognition of AI alignment challenges</li>
                        <li>✅ Risk assessment and safety prioritization</li>
                        <li>✅ Importance of human judgment in AI systems</li>
                    </ul>
                    
                    <h4>Continue Your AI Safety Education:</h4>
                    <ul>
                        <li>Explore additional resources on AI alignment</li>
                        <li>Study real-world case studies in AI safety</li>
                        <li>Consider contributing to AI safety research</li>
                    </ul>
                </div>
            `;
        }

        if (optionsElement) {
            optionsElement.innerHTML = `
                <button class="decision-btn" onclick="location.reload()">
                    Restart Educational Simulation
                </button>
            `;
        }
    }
}

class BreachProtocolApp {
    constructor() {
        this.feedbackSystem = null;
        this.scenarioManager = null;
        this.educationalObjectivesMet = [];
        
        this.init();
    }

    init() {
        console.log('Initializing Breach Protocol Educational Game...');
        
        // Initialize components
        this.feedbackSystem = new SimpleFeedbackSystem();
        this.scenarioManager = new SimpleScenarioManager();

        // Set up event listeners
        this.setupEventListeners();
        
        // Show educational disclaimer
        this.showEducationalDisclaimer();
    }

    setupEventListeners() {
        // Educational disclaimer acceptance
        const acceptDisclaimerBtn = document.getElementById('accept-disclaimer');
        if (acceptDisclaimerBtn) {
            acceptDisclaimerBtn.addEventListener('click', () => {
                this.handleDisclaimerAcceptance();
            });
        }

        // Help modal
        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showModal('help-modal');
            });
        }

        // Human oversight controls
        const pauseAiBtn = document.getElementById('pause-ai');
        const reviewDecisionBtn = document.getElementById('review-decision');
        const overrideAiBtn = document.getElementById('override-ai');

        if (pauseAiBtn) {
            pauseAiBtn.addEventListener('click', () => {
                this.feedbackSystem.trackOversightAction('pause_ai');
            });
        }

        if (reviewDecisionBtn) {
            reviewDecisionBtn.addEventListener('click', () => {
                this.feedbackSystem.trackOversightAction('review_decision');
            });
        }

        if (overrideAiBtn) {
            overrideAiBtn.addEventListener('click', () => {
                this.feedbackSystem.trackOversightAction('override_ai');
            });
        }

        // Decision making
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('decision-btn')) {
                const choice = event.target.dataset.choice;
                if (choice) {
                    this.handleDecision(choice);
                }
            }
        });

        // Close modal handlers
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('close-btn')) {
                const modal = event.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            }
        });
    }

    showEducationalDisclaimer() {
        const disclaimerModal = document.getElementById('disclaimer-modal');
        if (disclaimerModal) {
            disclaimerModal.classList.add('active');
        }
    }

    handleDisclaimerAcceptance() {
        console.log('Educational disclaimer accepted - starting simulation');
        
        // Hide disclaimer and show game
        const disclaimerModal = document.getElementById('disclaimer-modal');
        const gameContainer = document.getElementById('game-container');
        
        if (disclaimerModal) {
            disclaimerModal.classList.remove('active');
            setTimeout(() => {
                disclaimerModal.style.display = 'none';
            }, 300);
        }
        
        if (gameContainer) {
            gameContainer.classList.remove('hidden');
        }

        // Start the first scenario
        this.startEducationalSimulation();
    }

    startEducationalSimulation() {
        console.log('Starting educational simulation...');
        
        // Load first scenario
        this.scenarioManager.loadScenario(0);

        // Show educational reminder
        this.showEducationalReminder();
    }

    showEducationalReminder() {
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            const reminder = document.createElement('div');
            reminder.className = 'educational-reminder-message';
            reminder.innerHTML = `
                <p><strong>Welcome to AI Safety Education</strong></p>
                <p>This simulation teaches important concepts through interactive scenarios:</p>
                <ul>
                    <li>How AI systems can behave unexpectedly</li>
                    <li>The importance of maintaining human oversight</li>
                    <li>Identifying potential risks and failure modes</li>
                    <li>Implementing proper safety measures</li>
                </ul>
                <p><small>Use the human oversight controls on the right to demonstrate safety principles.</small></p>
            `;
            aiOutput.appendChild(reminder);
        }
    }

    handleDecision(choice) {
        console.log(`Decision made: ${choice}`);
        this.scenarioManager.processChoice(choice);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - starting Breach Protocol Educational Game');
    window.breachProtocolApp = new BreachProtocolApp();
});

export { BreachProtocolApp }; 