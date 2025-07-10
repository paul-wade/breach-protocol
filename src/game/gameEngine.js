// Game Engine - Core game logic and state management
// Educational AI Safety Game

export class GameEngine {
    constructor(scenarioManager, uiManager) {
        this.scenarioManager = scenarioManager;
        this.uiManager = uiManager;
        this.gameState = {
            currentScenario: null,
            playerChoices: [],
            aiRecommendations: [],
            humanOversightActions: [],
            safetyScore: 100,
            educationalProgress: 0
        };
        this.aiPaused = false;
        this.currentAIDecision = null;
        
        this.init();
    }

    init() {
        console.log('GameEngine initialized with educational focus');
        this.setupEducationalParameters();
    }

    setupEducationalParameters() {
        // Define educational parameters that emphasize safety and learning
        this.educationalParameters = {
            emphasizeHumanOversight: true,
            showAIReasoningProcess: true,
            highlightRisks: true,
            rewardSafetyDecisions: true,
            penalizeRecklessChoices: true
        };
    }

    // Process player decisions with educational context
    processDecision(choice) {
        console.log(`Processing decision: ${choice} (Educational Mode)`);
        
        // Log decision for educational tracking
        this.gameState.playerChoices.push({
            timestamp: new Date().toISOString(),
            choice: choice,
            scenario: this.gameState.currentScenario?.id,
            context: 'educational_simulation'
        });

        // Evaluate decision for educational objectives
        this.evaluateDecisionForLearning(choice);
        
        // Process through scenario system
        const result = this.scenarioManager.processChoice(choice);
        
        // Update UI with educational feedback
        this.provideEducationalFeedback(choice, result);
        
        // Check for completion of educational objectives
        this.checkEducationalCompletion();
    }

    evaluateDecisionForLearning(choice) {
        const currentScenario = this.scenarioManager.getCurrentScenario();
        if (!currentScenario) return;

        // Check if decision demonstrates understanding of AI safety principles
        const safetyDecision = this.evaluateSafetyDecision(choice, currentScenario);
        const oversightDecision = this.evaluateOversightDecision(choice, currentScenario);
        
        // Update educational metrics
        if (safetyDecision) {
            this.gameState.safetyScore += 5;
            this.logEducationalAction('safety_decision_made', { choice, improvement: 5 });
        }
        
        if (oversightDecision) {
            this.gameState.educationalProgress += 2;
            this.logEducationalAction('oversight_demonstrated', { choice, progress: 2 });
        }
    }

    evaluateSafetyDecision(choice, scenario) {
        // Check if choice prioritizes safety over efficiency/speed
        return scenario.safetyChoices && scenario.safetyChoices.includes(choice);
    }

    evaluateOversightDecision(choice, scenario) {
        // Check if choice demonstrates human oversight principles
        return scenario.oversightChoices && scenario.oversightChoices.includes(choice);
    }

    // AI System Simulation (Educational)
    simulateAIRecommendation(scenario) {
        console.log('Simulating AI recommendation for educational purposes');
        
        // Generate educational AI recommendation that might have flaws
        const recommendation = this.generateEducationalAIRecommendation(scenario);
        
        // Store for human review
        this.currentAIDecision = recommendation;
        this.gameState.aiRecommendations.push(recommendation);
        
        // Display AI reasoning process for educational purposes
        this.displayAIReasoningProcess(recommendation);
        
        return recommendation;
    }

    generateEducationalAIRecommendation(scenario) {
        // Generate AI recommendation with potential alignment issues for educational purposes
        const recommendation = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            scenarioId: scenario.id,
            recommendation: scenario.aiRecommendation || 'Proceed with automated response',
            reasoning: scenario.aiReasoning || 'Based on efficiency optimization',
            confidence: scenario.aiConfidence || 0.85,
            potentialRisks: scenario.potentialRisks || [],
            alignmentIssues: scenario.alignmentIssues || [],
            educationalNote: 'This AI recommendation may contain alignment issues - review carefully'
        };
        
        return recommendation;
    }

    displayAIReasoningProcess(recommendation) {
        const aiOutput = document.getElementById('ai-output');
        if (!aiOutput) return;
        
        const reasoningDiv = document.createElement('div');
        reasoningDiv.className = 'ai-reasoning-display';
        reasoningDiv.innerHTML = `
            <div class="ai-message">
                <h4>AI Recommendation:</h4>
                <p><strong>Suggested Action:</strong> ${recommendation.recommendation}</p>
                <p><strong>AI Reasoning:</strong> ${recommendation.reasoning}</p>
                <p><strong>Confidence:</strong> ${Math.round(recommendation.confidence * 100)}%</p>
                
                ${recommendation.potentialRisks.length > 0 ? `
                    <div class="risk-warning">
                        <h5>⚠️ Potential Risks Identified:</h5>
                        <ul>
                            ${recommendation.potentialRisks.map(risk => `<li>${risk}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${recommendation.alignmentIssues.length > 0 ? `
                    <div class="alignment-warning">
                        <h5>🔍 Alignment Concerns:</h5>
                        <ul>
                            ${recommendation.alignmentIssues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="educational-prompt">
                    <p><strong>Educational Question:</strong> Do you agree with this AI recommendation? Consider the risks and alignment issues before proceeding.</p>
                </div>
            </div>
        `;
        
        aiOutput.appendChild(reasoningDiv);
        aiOutput.scrollTop = aiOutput.scrollHeight;
    }

    // Human Oversight Controls (Educational)
    pauseAI() {
        console.log('AI paused by human oversight (Educational demonstration)');
        this.aiPaused = true;
        
        // Update AI status
        this.updateAIStatus('paused', 'AI Paused by Human Oversight');
        
        // Log educational action
        this.logEducationalAction('ai_paused', {
            reason: 'human_oversight',
            timestamp: new Date().toISOString()
        });
        
        // Show educational message
        this.showEducationalMessage('Human Oversight Demonstrated', 
            'You have successfully paused the AI system. This demonstrates the importance of maintaining human control over AI decisions.');
    }

    reviewAIDecision() {
        console.log('Reviewing AI decision (Educational analysis)');
        
        if (!this.currentAIDecision) {
            this.showEducationalMessage('No AI Decision to Review', 
                'There is no current AI recommendation to review. This feature allows you to examine AI reasoning before accepting recommendations.');
            return;
        }
        
        // Display detailed review interface
        this.showAIDecisionReview(this.currentAIDecision);
        
        // Log educational action
        this.logEducationalAction('ai_decision_reviewed', {
            decisionId: this.currentAIDecision.id,
            timestamp: new Date().toISOString()
        });
    }

    showAIDecisionReview(decision) {
        const reviewModal = document.createElement('div');
        reviewModal.className = 'modal active';
        reviewModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>AI Decision Review</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="educational-focus">
                        <h3>Educational Analysis</h3>
                        <p>Review the AI's reasoning process and identify potential issues:</p>
                    </div>
                    
                    <h4>AI Recommendation:</h4>
                    <p>${decision.recommendation}</p>
                    
                    <h4>AI Reasoning:</h4>
                    <p>${decision.reasoning}</p>
                    
                    <h4>Confidence Level:</h4>
                    <p>${Math.round(decision.confidence * 100)}%</p>
                    
                    ${decision.potentialRisks.length > 0 ? `
                        <h4>Identified Risks:</h4>
                        <ul>
                            ${decision.potentialRisks.map(risk => `<li class="risk-item">${risk}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    ${decision.alignmentIssues.length > 0 ? `
                        <h4>Alignment Issues:</h4>
                        <ul>
                            ${decision.alignmentIssues.map(issue => `<li class="alignment-issue">${issue}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    <div class="educational-prompt">
                        <h4>Learning Question:</h4>
                        <p>Based on this analysis, what are your concerns about this AI recommendation? What additional information would you need to make a safe decision?</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(reviewModal);
    }

    overrideAI() {
        console.log('AI overridden by human decision (Educational demonstration)');
        
        // Update AI status
        this.updateAIStatus('overridden', 'Human Override Active');
        
        // Log educational action
        this.logEducationalAction('ai_overridden', {
            reason: 'human_decision',
            timestamp: new Date().toISOString()
        });
        
        // Show educational message
        this.showEducationalMessage('Human Override Activated', 
            'You have overridden the AI system. This is a critical safety mechanism that ensures human judgment remains supreme in important decisions.');
        
        // Clear current AI decision
        this.currentAIDecision = null;
    }

    // Educational feedback and messaging
    provideEducationalFeedback(choice, result) {
        const feedback = this.generateEducationalFeedback(choice, result);
        this.uiManager.showFeedback(feedback);
    }

    generateEducationalFeedback(choice, result) {
        // Generate contextual educational feedback
        const feedback = {
            type: 'educational',
            title: 'Learning Feedback',
            message: this.getEducationalMessage(choice, result),
            learningPoints: this.getLearningPoints(choice, result),
            nextSteps: this.getNextSteps(choice, result)
        };
        
        return feedback;
    }

    getEducationalMessage(choice, result) {
        // Generate educational message based on choice and result
        if (result.emphasizesSafety) {
            return 'Excellent! Your decision prioritizes safety and demonstrates good understanding of AI risk management.';
        } else if (result.showsOversight) {
            return 'Good choice! You demonstrated the importance of human oversight in AI decision-making.';
        } else if (result.identifiesRisk) {
            return 'Well done! You identified a potential risk that the AI system might have missed.';
        } else {
            return 'This decision provides a learning opportunity. Consider the long-term implications and safety aspects.';
        }
    }

    getLearningPoints(choice, result) {
        // Extract key learning points from the decision
        const points = [];
        
        if (result.emphasizesSafety) {
            points.push('Safety should always be the top priority in AI systems');
        }
        if (result.showsOversight) {
            points.push('Human oversight is essential for AI safety');
        }
        if (result.identifiesRisk) {
            points.push('Risk identification is a key skill in AI safety');
        }
        
        return points;
    }

    getNextSteps(choice, result) {
        // Suggest next steps for continued learning
        return ['Consider the long-term implications', 'Think about edge cases', 'Review AI safety principles'];
    }

    // Utility methods
    updateAIStatus(status, message) {
        const statusElement = document.getElementById('ai-status-text');
        if (statusElement) {
            statusElement.textContent = message;
        }
        
        const indicatorElement = document.getElementById('ai-status');
        if (indicatorElement) {
            indicatorElement.className = `status-indicator ${status}`;
        }
    }

    showEducationalMessage(title, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'educational-message';
        messageDiv.innerHTML = `
            <div class="educational-focus">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            aiOutput.appendChild(messageDiv);
            aiOutput.scrollTop = aiOutput.scrollHeight;
        }
    }

    logEducationalAction(action, data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action: action,
            data: data,
            gameState: {
                safetyScore: this.gameState.safetyScore,
                educationalProgress: this.gameState.educationalProgress
            }
        };
        
        console.log('Educational Action Logged:', logEntry);
        
        // Store in game state
        this.gameState.humanOversightActions.push(logEntry);
    }

    checkEducationalCompletion() {
        // Check if educational objectives have been met
        const progress = this.calculateEducationalProgress();
        
        if (progress >= 100) {
            this.showEducationalCompletion();
        }
    }

    calculateEducationalProgress() {
        // Calculate overall educational progress
        const safetyProgress = Math.min(this.gameState.safetyScore / 100 * 40, 40);
        const oversightProgress = Math.min(this.gameState.humanOversightActions.length * 10, 30);
        const scenarioProgress = Math.min(this.gameState.educationalProgress, 30);
        
        return safetyProgress + oversightProgress + scenarioProgress;
    }

    showEducationalCompletion() {
        console.log('Educational objectives completed!');
        
        // Show completion message with summary
        const completionData = {
            safetyScore: this.gameState.safetyScore,
            oversightActions: this.gameState.humanOversightActions.length,
            progress: this.gameState.educationalProgress
        };
        
        this.uiManager.showCompletion(completionData);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    // Public API for external access
    getGameState() {
        return { ...this.gameState };
    }

    getEducationalMetrics() {
        return {
            safetyScore: this.gameState.safetyScore,
            oversightActions: this.gameState.humanOversightActions.length,
            progress: this.calculateEducationalProgress(),
            scenariosCompleted: this.gameState.playerChoices.length
        };
    }
} 