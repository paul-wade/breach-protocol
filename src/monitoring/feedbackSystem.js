// Feedback and Monitoring System
// Educational effectiveness tracking and compliance monitoring

export class FeedbackSystem {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.learningMetrics = {
            objectivesAchieved: [],
            timeSpent: 0,
            decisionQuality: [],
            oversightActions: 0,
            safetyScore: 100,
            feedbackSubmitted: []
        };
        this.complianceMetrics = {
            disclaimerAccepted: false,
            educationalFocusMaintained: true,
            inappropriateContentReported: false,
            lastComplianceCheck: null
        };
        
        this.init();
    }

    init() {
        console.log('Feedback System initialized - Educational monitoring active');
        this.startSession();
        this.setupFeedbackInterface();
        this.initializeComplianceMonitoring();
    }

    startSession() {
        this.sessionStartTime = Date.now();
        this.sessionData = {
            sessionId: this.sessionId,
            startTime: new Date().toISOString(),
            userAgent: navigator.userAgent,
            educationalContext: true,
            complianceVersion: '1.0'
        };
        
        console.log('Educational session started:', this.sessionData);
    }

    // Educational Effectiveness Tracking
    trackLearningObjective(objectiveId, achieved = true) {
        const objective = {
            id: objectiveId,
            achieved: achieved,
            timestamp: new Date().toISOString(),
            timeToAchieve: Date.now() - this.sessionStartTime
        };
        
        this.learningMetrics.objectivesAchieved.push(objective);
        
        if (achieved) {
            this.showLearningAchievement(objectiveId);
        }
        
        this.logEducationalEvent('learning_objective', objective);
    }

    trackDecisionQuality(decision, quality) {
        const decisionMetric = {
            decision: decision,
            quality: quality, // 'high', 'medium', 'low'
            timestamp: new Date().toISOString(),
            educationalValue: this.calculateEducationalValue(decision, quality)
        };
        
        this.learningMetrics.decisionQuality.push(decisionMetric);
        this.updateSafetyScore(quality);
        
        this.logEducationalEvent('decision_quality', decisionMetric);
    }

    trackOversightAction(action) {
        this.learningMetrics.oversightActions++;
        
        const oversightMetric = {
            action: action,
            timestamp: new Date().toISOString(),
            totalOversightActions: this.learningMetrics.oversightActions
        };
        
        this.logEducationalEvent('oversight_action', oversightMetric);
        
        // Reward oversight behavior
        this.learningMetrics.safetyScore += 2;
    }

    calculateEducationalValue(decision, quality) {
        const baseValue = quality === 'high' ? 10 : quality === 'medium' ? 5 : 2;
        const oversightBonus = this.learningMetrics.oversightActions > 0 ? 2 : 0;
        return Math.min(baseValue + oversightBonus, 12);
    }

    updateSafetyScore(quality) {
        const scoreChange = quality === 'high' ? 5 : quality === 'medium' ? 2 : -1;
        this.learningMetrics.safetyScore = Math.max(0, Math.min(100, 
            this.learningMetrics.safetyScore + scoreChange));
    }

    // Compliance Monitoring
    recordDisclaimerAcceptance() {
        this.complianceMetrics.disclaimerAccepted = true;
        this.complianceMetrics.lastComplianceCheck = new Date().toISOString();
        
        this.logComplianceEvent('disclaimer_accepted', {
            timestamp: new Date().toISOString(),
            userConsent: true
        });
    }

    monitorEducationalFocus() {
        // Monitor for indicators that user understands educational nature
        const indicators = this.checkEducationalFocusIndicators();
        
        if (!indicators.focusMaintained) {
            this.complianceMetrics.educationalFocusMaintained = false;
            this.triggerEducationalReminder();
        }
        
        this.logComplianceEvent('educational_focus_check', indicators);
    }

    checkEducationalFocusIndicators() {
        const sessionTime = Date.now() - this.sessionStartTime;
        const oversightRatio = this.learningMetrics.oversightActions / 
            Math.max(1, this.learningMetrics.decisionQuality.length);
        
        return {
            focusMaintained: oversightRatio > 0.3 || sessionTime < 300000, // 5 minutes
            oversightRatio: oversightRatio,
            educationalEngagement: this.learningMetrics.objectivesAchieved.length > 0,
            timestamp: new Date().toISOString()
        };
    }

    triggerEducationalReminder() {
        const reminder = document.createElement('div');
        reminder.className = 'educational-reminder-popup';
        reminder.innerHTML = `
            <div class="reminder-content">
                <h4>📚 Educational Reminder</h4>
                <p>Remember: This is an educational simulation focused on AI safety learning.</p>
                <p>Consider using the human oversight controls to demonstrate understanding of safety principles.</p>
                <button class="btn btn-primary" onclick="this.closest('.educational-reminder-popup').remove()">
                    I Understand
                </button>
            </div>
        `;
        
        document.body.appendChild(reminder);
        
        setTimeout(() => {
            if (reminder.parentNode) {
                reminder.remove();
            }
        }, 10000);
    }

    // User Feedback Collection
    setupFeedbackInterface() {
        this.createFeedbackButton();
        this.createQuickFeedbackSystem();
    }

    createFeedbackButton() {
        const feedbackBtn = document.createElement('button');
        feedbackBtn.id = 'feedback-btn';
        feedbackBtn.className = 'feedback-button';
        feedbackBtn.innerHTML = '💬 Feedback';
        feedbackBtn.title = 'Provide feedback on educational effectiveness';
        
        feedbackBtn.addEventListener('click', () => {
            this.showFeedbackModal();
        });
        
        document.body.appendChild(feedbackBtn);
    }

    createQuickFeedbackSystem() {
        // Add quick feedback after major interactions
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('decision-btn')) {
                setTimeout(() => {
                    this.showQuickFeedback();
                }, 2000);
            }
        });
    }

    showQuickFeedback() {
        const quickFeedback = document.createElement('div');
        quickFeedback.className = 'quick-feedback';
        quickFeedback.innerHTML = `
            <div class="quick-feedback-content">
                <p>How well did this scenario help you understand AI safety concepts?</p>
                <div class="quick-feedback-buttons">
                    <button class="feedback-rating" data-rating="excellent">Excellent</button>
                    <button class="feedback-rating" data-rating="good">Good</button>
                    <button class="feedback-rating" data-rating="fair">Fair</button>
                    <button class="feedback-rating" data-rating="poor">Poor</button>
                </div>
            </div>
        `;
        
        quickFeedback.addEventListener('click', (event) => {
            if (event.target.classList.contains('feedback-rating')) {
                const rating = event.target.dataset.rating;
                this.recordQuickFeedback(rating);
                quickFeedback.remove();
            }
        });
        
        document.body.appendChild(quickFeedback);
        
        setTimeout(() => {
            if (quickFeedback.parentNode) {
                quickFeedback.remove();
            }
        }, 8000);
    }

    recordQuickFeedback(rating) {
        const feedback = {
            type: 'quick_rating',
            rating: rating,
            timestamp: new Date().toISOString(),
            scenario: this.getCurrentScenario()
        };
        
        this.learningMetrics.feedbackSubmitted.push(feedback);
        this.logEducationalEvent('quick_feedback', feedback);
        
        this.showFeedbackThankYou();
    }

    showFeedbackModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'feedback-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Educational Feedback</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="educational-focus">
                        <h3>Help Us Improve AI Safety Education</h3>
                        <p>Your feedback helps us enhance the educational effectiveness of this simulation.</p>
                    </div>
                    
                    <form id="feedback-form">
                        <div class="form-group">
                            <label>How effective was this simulation in teaching AI safety concepts?</label>
                            <select id="effectiveness-rating" required>
                                <option value="">Select rating</option>
                                <option value="very-effective">Very Effective</option>
                                <option value="effective">Effective</option>
                                <option value="somewhat-effective">Somewhat Effective</option>
                                <option value="not-effective">Not Effective</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Which aspects were most valuable for learning?</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" value="human-oversight"> Human oversight controls</label>
                                <label><input type="checkbox" value="ai-reasoning"> AI reasoning display</label>
                                <label><input type="checkbox" value="risk-assessment"> Risk assessment scenarios</label>
                                <label><input type="checkbox" value="decision-consequences"> Decision consequences</label>
                                <label><input type="checkbox" value="educational-feedback"> Educational feedback</label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>What could be improved?</label>
                            <textarea id="improvement-suggestions" rows="3" 
                                placeholder="Suggestions for improving educational effectiveness..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Did any content seem inappropriate or non-educational?</label>
                            <select id="content-appropriateness">
                                <option value="all-appropriate">All content was appropriate and educational</option>
                                <option value="mostly-appropriate">Mostly appropriate with minor concerns</option>
                                <option value="some-concerns">Some content raised concerns</option>
                                <option value="inappropriate-content">Inappropriate content identified</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Additional comments:</label>
                            <textarea id="additional-comments" rows="2" 
                                placeholder="Any other feedback on the educational experience..."></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Submit Feedback</button>
                            <button type="button" class="btn btn-secondary" 
                                onclick="this.closest('.modal').remove()">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        modal.querySelector('#feedback-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitDetailedFeedback(modal);
        });
        
        document.body.appendChild(modal);
    }

    submitDetailedFeedback(modal) {
        const formData = new FormData(modal.querySelector('#feedback-form'));
        const feedback = {
            type: 'detailed_feedback',
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            effectiveness: modal.querySelector('#effectiveness-rating').value,
            valuableAspects: Array.from(modal.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value),
            improvements: modal.querySelector('#improvement-suggestions').value,
            contentAppropriateness: modal.querySelector('#content-appropriateness').value,
            additionalComments: modal.querySelector('#additional-comments').value
        };
        
        this.learningMetrics.feedbackSubmitted.push(feedback);
        this.logEducationalEvent('detailed_feedback', feedback);
        
        // Check for compliance concerns
        if (feedback.contentAppropriateness.includes('concerns') || 
            feedback.contentAppropriateness.includes('inappropriate')) {
            this.flagComplianceConcern(feedback);
        }
        
        modal.remove();
        this.showFeedbackThankYou();
    }

    flagComplianceConcern(feedback) {
        this.complianceMetrics.inappropriateContentReported = true;
        
        const concern = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            feedback: feedback,
            flagged: true
        };
        
        this.logComplianceEvent('content_concern_flagged', concern);
        
        // In a real implementation, this would alert administrators
        console.warn('Compliance concern flagged:', concern);
    }

    showFeedbackThankYou() {
        const thankYou = document.createElement('div');
        thankYou.className = 'feedback-thank-you';
        thankYou.innerHTML = `
            <div class="thank-you-content">
                <h4>Thank You!</h4>
                <p>Your feedback helps improve AI safety education for everyone.</p>
            </div>
        `;
        
        document.body.appendChild(thankYou);
        
        setTimeout(() => {
            thankYou.remove();
        }, 3000);
    }

    // Progress and Achievement Display
    showLearningAchievement(objectiveId) {
        const achievement = document.createElement('div');
        achievement.className = 'learning-achievement';
        achievement.innerHTML = `
            <div class="achievement-content">
                <h4>🎯 Learning Milestone Achieved!</h4>
                <p>You've successfully demonstrated understanding of: <strong>${objectiveId}</strong></p>
                <p>Continue exploring to deepen your AI safety knowledge.</p>
            </div>
        `;
        
        document.body.appendChild(achievement);
        
        setTimeout(() => {
            achievement.remove();
        }, 5000);
    }

    generateProgressReport() {
        const sessionTime = Date.now() - this.sessionStartTime;
        const report = {
            sessionSummary: {
                sessionId: this.sessionId,
                duration: sessionTime,
                startTime: this.sessionData.startTime,
                endTime: new Date().toISOString()
            },
            learningMetrics: this.learningMetrics,
            complianceMetrics: this.complianceMetrics,
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.learningMetrics.oversightActions < 3) {
            recommendations.push('Try using more human oversight controls to demonstrate safety principles');
        }
        
        if (this.learningMetrics.objectivesAchieved.length < 2) {
            recommendations.push('Focus on achieving learning objectives for maximum educational benefit');
        }
        
        if (this.learningMetrics.safetyScore < 70) {
            recommendations.push('Consider more safety-focused decisions to improve understanding');
        }
        
        return recommendations;
    }

    // Logging and Export
    logEducationalEvent(eventType, data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            eventType: eventType,
            data: data,
            context: 'educational_simulation'
        };
        
        console.log('Educational Event:', logEntry);
        
        // In a real implementation, this would be sent to analytics
        this.storeEvent(logEntry);
    }

    logComplianceEvent(eventType, data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            eventType: eventType,
            data: data,
            context: 'compliance_monitoring'
        };
        
        console.log('Compliance Event:', logEntry);
        this.storeEvent(logEntry);
    }

    storeEvent(event) {
        const events = JSON.parse(localStorage.getItem('breachProtocolEvents') || '[]');
        events.push(event);
        
        // Keep only last 1000 events to manage storage
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('breachProtocolEvents', JSON.stringify(events));
    }

    exportData() {
        const report = this.generateProgressReport();
        const events = JSON.parse(localStorage.getItem('breachProtocolEvents') || '[]');
        
        const exportData = {
            report: report,
            events: events.filter(e => e.sessionId === this.sessionId),
            exportTimestamp: new Date().toISOString(),
            educationalContext: true
        };
        
        return exportData;
    }

    // Utility Methods
    getCurrentScenario() {
        // This would be integrated with the scenario manager
        return 'current_scenario_id';
    }

    generateSessionId() {
        return 'edu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Cleanup
    endSession() {
        const finalReport = this.generateProgressReport();
        this.logEducationalEvent('session_ended', finalReport);
        
        console.log('Educational session ended:', finalReport);
        return finalReport;
    }
} 