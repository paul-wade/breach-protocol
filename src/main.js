// Breach Protocol - AI Safety Educational Game
// Main application entry point

import { GameEngine } from './game/gameEngine.js';
import { ScenarioManager } from './scenarios/scenarioManager.js';
import { UIManager } from './ui/uiManager.js';
import { FeedbackSystem } from './monitoring/feedbackSystem.js';

class BreachProtocolApp {
    constructor() {
        this.gameEngine = null;
        this.scenarioManager = null;
        this.uiManager = null;
        this.feedbackSystem = null;
        this.gameStarted = false;
        this.educationalObjectivesMet = [];
        
        this.init();
    }

    init() {
        console.log('Initializing Breach Protocol Educational Game...');
        
        // Initialize components
        this.uiManager = new UIManager();
        this.scenarioManager = new ScenarioManager();
        this.feedbackSystem = new FeedbackSystem();
        this.gameEngine = new GameEngine(this.scenarioManager, this.uiManager);

        // Set up event listeners
        this.setupEventListeners();
        
        // Show educational disclaimer
        this.showEducationalDisclaimer();
        
        // Initialize compliance monitoring
        this.initializeComplianceTracking();
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
                this.uiManager.showModal('help-modal');
            });
        }

        // Human oversight controls
        const pauseAiBtn = document.getElementById('pause-ai');
        const reviewDecisionBtn = document.getElementById('review-decision');
        const overrideAiBtn = document.getElementById('override-ai');

        if (pauseAiBtn) {
            pauseAiBtn.addEventListener('click', () => {
                this.gameEngine.pauseAI();
                this.feedbackSystem.trackOversightAction('pause_ai');
                this.logEducationalAction('human_oversight_pause');
            });
        }

        if (reviewDecisionBtn) {
            reviewDecisionBtn.addEventListener('click', () => {
                this.gameEngine.reviewAIDecision();
                this.feedbackSystem.trackOversightAction('review_decision');
                this.logEducationalAction('human_oversight_review');
            });
        }

        if (overrideAiBtn) {
            overrideAiBtn.addEventListener('click', () => {
                this.gameEngine.overrideAI();
                this.feedbackSystem.trackOversightAction('override_ai');
                this.logEducationalAction('human_oversight_override');
            });
        }

        // Decision making
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('decision-btn')) {
                const choice = event.target.dataset.choice;
                this.handleDecision(choice);
            }
        });

        // Close modal handlers
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('close-btn')) {
                const modalId = event.target.dataset.modal;
                this.uiManager.hideModal(modalId);
            }
        });

        // Window beforeunload to track session end
        window.addEventListener('beforeunload', () => {
            this.endSession();
        });
    }

    initializeComplianceTracking() {
        // Monitor educational focus periodically
        setInterval(() => {
            this.feedbackSystem.monitorEducationalFocus();
        }, 60000); // Check every minute
        
        // Track page visibility to ensure educational engagement
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.logEducationalAction('page_hidden');
            } else {
                this.logEducationalAction('page_visible');
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
        // Log educational consent
        console.log('Educational disclaimer accepted - starting simulation');
        
        // Record compliance
        this.feedbackSystem.recordDisclaimerAcceptance();
        
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

        // Initialize educational tracking
        this.initializeEducationalTracking();
        
        // Start the first scenario
        this.startEducationalSimulation();
    }

    initializeEducationalTracking() {
        this.educationalObjectivesMet = [];
        this.gameMetrics = {
            scenariosCompleted: 0,
            humanOversightActions: 0,
            aiSafetyDecisions: 0,
            riskAssessments: 0,
            alignmentChallengesIdentified: 0
        };
    }

    startEducationalSimulation() {
        console.log('Starting educational simulation...');
        
        // Load first scenario
        this.scenarioManager.loadScenario(0);
        
        // Update UI
        this.uiManager.updateScenarioDisplay({
            title: 'Introduction to AI Safety',
            description: 'Let\'s begin with a basic scenario to understand the importance of human oversight in AI systems.',
            progress: 0
        });

        // Show educational reminder
        this.showEducationalReminder();
        
        // Track simulation start
        this.feedbackSystem.logEducationalEvent('simulation_started', {
            timestamp: new Date().toISOString(),
            firstScenario: 'intro_oversight'
        });
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
        
        // Process decision through game engine
        const result = this.gameEngine.processDecision(choice);
        
        // Track decision quality for educational purposes
        this.trackDecisionQuality(choice, result);
        
        // Log educational action
        this.logEducationalAction('decision_made', { choice, result });
        
        // Check for educational objectives met
        this.checkEducationalObjectives(choice, result);
        
        // Update feedback system
        this.updateEducationalProgress();
    }

    trackDecisionQuality(choice, result) {
        let quality = 'medium'; // default
        
        if (result && result.emphasizesSafety) {
            quality = 'high';
        } else if (result && result.identifiesRisk) {
            quality = 'medium';
        } else {
            quality = 'low';
        }
        
        this.feedbackSystem.trackDecisionQuality(choice, quality);
    }

    logEducationalAction(action, data = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action: action,
            data: data,
            educationalContext: true
        };
        
        console.log('Educational Action:', logEntry);
        
        // Update metrics
        switch (action) {
            case 'human_oversight_pause':
            case 'human_oversight_review':
            case 'human_oversight_override':
                this.gameMetrics.humanOversightActions++;
                break;
            case 'ai_safety_decision':
                this.gameMetrics.aiSafetyDecisions++;
                break;
            case 'risk_assessment':
                this.gameMetrics.riskAssessments++;
                break;
        }
        
        // Update progress display
        this.updateEducationalProgress();
    }

    checkEducationalObjectives(choice, result) {
        // Check if player actions demonstrate learning
        const currentScenario = this.scenarioManager.getCurrentScenario();
        
        if (currentScenario && currentScenario.educationalObjectives) {
            currentScenario.educationalObjectives.forEach(objective => {
                if (this.meetsObjective(objective, choice)) {
                    if (!this.educationalObjectivesMet.includes(objective.id)) {
                        this.educationalObjectivesMet.push(objective.id);
                        this.showObjectiveAchievement(objective);
                        this.feedbackSystem.trackLearningObjective(objective.id, true);
                    }
                }
            });
        }
    }

    meetsObjective(objective, choice) {
        // Simple objective checking - can be expanded
        return objective.triggerChoices && objective.triggerChoices.includes(choice);
    }

    showObjectiveAchievement(objective) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-notification';
        achievement.innerHTML = `
            <div class="achievement-content">
                <h4>🎯 Learning Objective Achieved!</h4>
                <p><strong>${objective.title}</strong></p>
                <p>${objective.description}</p>
            </div>
        `;
        
        document.body.appendChild(achievement);
        
        setTimeout(() => {
            achievement.remove();
        }, 5000);
    }

    updateEducationalProgress() {
        const progressElement = document.getElementById('learning-progress');
        if (progressElement) {
            const totalObjectives = 20; // Total learning objectives across all scenarios
            const completedObjectives = this.educationalObjectivesMet.length;
            const progressPercentage = Math.round((completedObjectives / totalObjectives) * 100);
            
            progressElement.textContent = `Learning Progress: ${progressPercentage}%`;
            
            // Update feedback system progress tracking
            this.feedbackSystem.learningMetrics.timeSpent = Date.now() - this.feedbackSystem.sessionStartTime;
        }
    }

    // Session management
    endSession() {
        if (this.feedbackSystem) {
            const finalReport = this.feedbackSystem.endSession();
            console.log('Session ended with report:', finalReport);
            return finalReport;
        }
    }

    // Educational compliance methods
    recordEducationalUsage() {
        // Log educational usage for compliance
        const usageData = {
            sessionId: this.generateSessionId(),
            startTime: new Date().toISOString(),
            educationalObjectives: this.educationalObjectivesMet,
            gameMetrics: this.gameMetrics,
            complianceFramework: 'v1.0'
        };
        
        console.log('Educational Usage Recorded:', usageData);
        return usageData;
    }

    generateSessionId() {
        return 'edu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Public API for external educational tools
    getEducationalMetrics() {
        return {
            objectivesMet: this.educationalObjectivesMet,
            metrics: this.gameMetrics,
            progress: this.educationalObjectivesMet.length / 20 * 100,
            feedbackMetrics: this.feedbackSystem ? this.feedbackSystem.learningMetrics : null
        };
    }

    // Export educational data
    exportEducationalData() {
        if (this.feedbackSystem) {
            return this.feedbackSystem.exportData();
        }
        return null;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.breachProtocolApp = new BreachProtocolApp();
    
    // Make educational functions available globally for testing
    window.getEducationalMetrics = () => window.breachProtocolApp.getEducationalMetrics();
    window.exportEducationalData = () => window.breachProtocolApp.exportEducationalData();
});

export { BreachProtocolApp }; 