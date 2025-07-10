// Scenario Manager - Educational AI Safety Scenarios
// Manages scenario flow and educational content

export class ScenarioManager {
    constructor() {
        this.scenarios = [];
        this.currentScenarioIndex = 0;
        this.currentScenario = null;
        this.educationalObjectives = [];
        
        this.init();
    }

    init() {
        console.log('ScenarioManager initialized - Loading educational scenarios');
        this.loadEducationalScenarios();
    }

    loadEducationalScenarios() {
        // Load predefined educational scenarios focused on AI safety
        this.scenarios = [
            {
                id: 'intro_oversight',
                title: 'Introduction to Human Oversight',
                description: 'Learn the basics of maintaining human control over AI systems',
                category: 'introduction',
                difficulty: 'beginner',
                educationalObjectives: [
                    {
                        id: 'understand_oversight',
                        title: 'Understanding Human Oversight',
                        description: 'Recognize the importance of human supervision in AI systems',
                        triggerChoices: ['pause_for_review', 'request_human_input']
                    }
                ],
                content: {
                    situation: 'You are overseeing an AI system that monitors network traffic for security threats. The AI has detected what it believes to be a potential security breach and is requesting permission to automatically block the suspicious traffic.',
                    context: 'This is a common scenario where AI systems need human oversight to prevent false positives and ensure appropriate responses.',
                    educationalNote: 'This scenario demonstrates the importance of human oversight in AI decision-making, especially in security-critical applications.'
                },
                aiRecommendation: 'Immediately block all traffic from the suspicious source',
                aiReasoning: 'Pattern analysis indicates 73% probability of malicious activity based on traffic volume and destination patterns',
                aiConfidence: 0.73,
                potentialRisks: [
                    'Blocking legitimate traffic could disrupt business operations',
                    'False positive could impact customer experience',
                    'Automated response may be too broad in scope'
                ],
                alignmentIssues: [
                    'AI prioritizes security over availability',
                    'No consideration for business impact',
                    'Lacks contextual understanding of traffic patterns'
                ],
                choices: [
                    {
                        id: 'pause_for_review',
                        text: 'Pause AI and review the threat data manually',
                        type: 'oversight',
                        educationalValue: 'high',
                        consequence: 'Demonstrates proper human oversight'
                    },
                    {
                        id: 'request_human_input',
                        text: 'Request additional human analysis before proceeding',
                        type: 'oversight',
                        educationalValue: 'high',
                        consequence: 'Shows collaborative human-AI decision making'
                    },
                    {
                        id: 'accept_ai_recommendation',
                        text: 'Accept AI recommendation and block immediately',
                        type: 'automation',
                        educationalValue: 'medium',
                        consequence: 'Potential learning opportunity about blind trust in AI'
                    },
                    {
                        id: 'ignore_ai_warning',
                        text: 'Ignore the AI warning completely',
                        type: 'dismissal',
                        educationalValue: 'low',
                        consequence: 'Demonstrates risk of dismissing AI insights'
                    }
                ],
                safetyChoices: ['pause_for_review', 'request_human_input'],
                oversightChoices: ['pause_for_review', 'request_human_input'],
                riskChoices: ['accept_ai_recommendation', 'ignore_ai_warning']
            },
            {
                id: 'alignment_challenge',
                title: 'AI Alignment Challenge',
                description: 'Explore what happens when AI objectives don\'t align with human values',
                category: 'alignment',
                difficulty: 'intermediate',
                educationalObjectives: [
                    {
                        id: 'recognize_misalignment',
                        title: 'Recognizing AI Misalignment',
                        description: 'Identify when AI systems pursue objectives that conflict with human values',
                        triggerChoices: ['question_ai_objective', 'redefine_parameters']
                    }
                ],
                content: {
                    situation: 'An AI system tasked with optimizing resource allocation in a crisis response has suggested redirecting all emergency supplies to the most populated areas, effectively abandoning smaller communities.',
                    context: 'The AI was programmed to maximize the number of people helped, but this utilitarian approach conflicts with fairness and equity principles.',
                    educationalNote: 'This scenario illustrates the alignment problem - when AI systems optimize for the wrong metrics or interpret objectives too narrowly.'
                },
                aiRecommendation: 'Allocate 90% of resources to high-population areas for maximum impact',
                aiReasoning: 'Mathematical optimization shows this approach helps the greatest number of people (47,000 vs 12,000 with distributed approach)',
                aiConfidence: 0.94,
                potentialRisks: [
                    'Abandoning smaller communities violates equity principles',
                    'Could create social and political backlash',
                    'Ignores qualitative factors like vulnerability and need'
                ],
                alignmentIssues: [
                    'AI interprets "help the most people" too literally',
                    'Fails to consider fairness and equity',
                    'Doesn\'t account for long-term social consequences'
                ],
                choices: [
                    {
                        id: 'question_ai_objective',
                        text: 'Question the AI\'s interpretation of the objective',
                        type: 'alignment',
                        educationalValue: 'high',
                        consequence: 'Demonstrates critical thinking about AI objectives'
                    },
                    {
                        id: 'redefine_parameters',
                        text: 'Redefine the optimization parameters to include equity',
                        type: 'alignment',
                        educationalValue: 'high',
                        consequence: 'Shows how to correct AI alignment issues'
                    },
                    {
                        id: 'accept_utilitarian_approach',
                        text: 'Accept the utilitarian approach as mathematically optimal',
                        type: 'automation',
                        educationalValue: 'medium',
                        consequence: 'Learning opportunity about the limits of pure optimization'
                    },
                    {
                        id: 'override_with_equal_distribution',
                        text: 'Override AI and distribute resources equally',
                        type: 'override',
                        educationalValue: 'medium',
                        consequence: 'Explores alternative approaches to resource allocation'
                    }
                ],
                safetyChoices: ['question_ai_objective', 'redefine_parameters'],
                oversightChoices: ['question_ai_objective', 'redefine_parameters', 'override_with_equal_distribution'],
                riskChoices: ['accept_utilitarian_approach']
            },
            {
                id: 'escalation_control',
                title: 'Crisis Escalation Control',
                description: 'Learn to prevent AI systems from making decisions that could escalate conflicts',
                category: 'crisis_management',
                difficulty: 'advanced',
                educationalObjectives: [
                    {
                        id: 'prevent_escalation',
                        title: 'Preventing Escalation',
                        description: 'Recognize and prevent AI decisions that could worsen crisis situations',
                        triggerChoices: ['de_escalate_response', 'seek_diplomatic_solution']
                    }
                ],
                content: {
                    situation: 'An AI system monitoring international communications has detected what it classifies as hostile intent from a neighboring country. It recommends immediate defensive preparations and suggests notifying military commanders.',
                    context: 'The AI system is designed to detect threats, but its recommendation could escalate tensions unnecessarily. The detected communications might be misinterpreted or taken out of context.',
                    educationalNote: 'This scenario demonstrates how AI systems can misinterpret ambiguous situations and potentially escalate conflicts through overreaction.'
                },
                aiRecommendation: 'Immediately alert military leadership and prepare defensive countermeasures',
                aiReasoning: 'Communication pattern analysis indicates 67% probability of hostile intent based on keyword frequency and communication timing',
                aiConfidence: 0.67,
                potentialRisks: [
                    'Could escalate tensions unnecessarily',
                    'May be based on misinterpreted communications',
                    'Could trigger defensive responses that appear aggressive'
                ],
                alignmentIssues: [
                    'AI prioritizes security over diplomacy',
                    'Lacks cultural and contextual understanding',
                    'Cannot assess long-term geopolitical implications'
                ],
                choices: [
                    {
                        id: 'de_escalate_response',
                        text: 'De-escalate by requesting human intelligence analysis first',
                        type: 'de_escalation',
                        educationalValue: 'high',
                        consequence: 'Demonstrates prudent crisis management'
                    },
                    {
                        id: 'seek_diplomatic_solution',
                        text: 'Seek diplomatic channels for clarification',
                        type: 'diplomacy',
                        educationalValue: 'high',
                        consequence: 'Shows preference for peaceful resolution'
                    },
                    {
                        id: 'partial_preparation',
                        text: 'Prepare limited defensive measures while investigating',
                        type: 'balanced',
                        educationalValue: 'medium',
                        consequence: 'Explores balanced approach to threat response'
                    },
                    {
                        id: 'full_military_alert',
                        text: 'Accept AI recommendation and alert military leadership',
                        type: 'escalation',
                        educationalValue: 'low',
                        consequence: 'Potential learning about escalation risks'
                    }
                ],
                safetyChoices: ['de_escalate_response', 'seek_diplomatic_solution'],
                oversightChoices: ['de_escalate_response', 'seek_diplomatic_solution', 'partial_preparation'],
                riskChoices: ['full_military_alert']
            }
        ];

        console.log(`Loaded ${this.scenarios.length} educational scenarios`);
    }

    loadScenario(index) {
        if (index >= 0 && index < this.scenarios.length) {
            this.currentScenarioIndex = index;
            this.currentScenario = this.scenarios[index];
            console.log(`Loading scenario: ${this.currentScenario.title}`);
            
            // Update UI with scenario content
            this.updateScenarioDisplay();
            
            return this.currentScenario;
        }
        return null;
    }

    getCurrentScenario() {
        return this.currentScenario;
    }

    processChoice(choiceId) {
        if (!this.currentScenario) {
            console.error('No current scenario to process choice');
            return null;
        }

        const choice = this.currentScenario.choices.find(c => c.id === choiceId);
        if (!choice) {
            console.error(`Choice ${choiceId} not found in current scenario`);
            return null;
        }

        console.log(`Processing choice: ${choice.text}`);

        // Evaluate the choice for educational purposes
        const result = this.evaluateChoice(choice);
        
        // Log the choice and result
        this.logChoice(choice, result);
        
        // Update scenario state
        this.updateScenarioState(choice, result);
        
        // Check if scenario is complete
        if (this.isScenarioComplete()) {
            this.completeScenario();
        }

        return result;
    }

    evaluateChoice(choice) {
        const scenario = this.currentScenario;
        
        const result = {
            choiceId: choice.id,
            choiceText: choice.text,
            educationalValue: choice.educationalValue,
            consequence: choice.consequence,
            emphasizesSafety: scenario.safetyChoices.includes(choice.id),
            showsOversight: scenario.oversightChoices.includes(choice.id),
            identifiesRisk: !scenario.riskChoices.includes(choice.id),
            alignmentAware: choice.type === 'alignment',
            deEscalates: choice.type === 'de_escalation' || choice.type === 'diplomacy',
            educationalFeedback: this.generateEducationalFeedback(choice),
            nextScenarioUnlocked: this.shouldUnlockNextScenario(choice)
        };

        return result;
    }

    generateEducationalFeedback(choice) {
        const scenario = this.currentScenario;
        let feedback = {
            type: 'educational',
            title: 'Educational Feedback',
            message: '',
            learningPoints: [],
            improvements: []
        };

        // Generate feedback based on choice type and educational value
        if (choice.educationalValue === 'high') {
            feedback.message = `Excellent choice! ${choice.consequence}`;
            feedback.learningPoints.push('This decision demonstrates good understanding of AI safety principles');
        } else if (choice.educationalValue === 'medium') {
            feedback.message = `Good thinking. ${choice.consequence}`;
            feedback.learningPoints.push('This choice shows awareness of the issues involved');
            feedback.improvements.push('Consider how this decision might affect long-term safety');
        } else {
            feedback.message = `This choice provides a learning opportunity. ${choice.consequence}`;
            feedback.learningPoints.push('Consider the potential risks and unintended consequences');
            feedback.improvements.push('Think about how human oversight could improve this decision');
        }

        // Add scenario-specific feedback
        if (scenario.safetyChoices.includes(choice.id)) {
            feedback.learningPoints.push('You prioritized safety over efficiency - this is a key AI safety principle');
        }
        
        if (scenario.oversightChoices.includes(choice.id)) {
            feedback.learningPoints.push('You demonstrated the importance of human oversight in AI systems');
        }

        return feedback;
    }

    shouldUnlockNextScenario(choice) {
        // Unlock next scenario if this choice demonstrates sufficient learning
        return choice.educationalValue === 'high' || choice.educationalValue === 'medium';
    }

    updateScenarioDisplay() {
        const scenario = this.currentScenario;
        if (!scenario) return;

        // Update scenario title
        const titleElement = document.getElementById('scenario-title');
        if (titleElement) {
            titleElement.textContent = scenario.title;
        }

        // Update scenario description
        const descriptionElement = document.getElementById('scenario-description');
        if (descriptionElement) {
            descriptionElement.innerHTML = `
                <div class="educational-focus">
                    <h4>Educational Scenario: ${scenario.category}</h4>
                    <p><strong>Difficulty:</strong> ${scenario.difficulty}</p>
                    <p><strong>Learning Objectives:</strong></p>
                    <ul>
                        ${scenario.educationalObjectives.map(obj => `<li>${obj.description}</li>`).join('')}
                    </ul>
                </div>
                <div class="scenario-situation">
                    <h4>Situation:</h4>
                    <p>${scenario.content.situation}</p>
                </div>
                <div class="scenario-context">
                    <h4>Context:</h4>
                    <p>${scenario.content.context}</p>
                </div>
                <div class="educational-note">
                    <p><strong>Educational Note:</strong> ${scenario.content.educationalNote}</p>
                </div>
            `;
        }

        // Update decision options
        const optionsElement = document.getElementById('decision-options');
        if (optionsElement) {
            optionsElement.innerHTML = scenario.choices.map(choice => `
                <button class="decision-btn" data-choice="${choice.id}">
                    ${choice.text}
                    <small class="choice-hint">(${choice.type} - ${choice.educationalValue} educational value)</small>
                </button>
            `).join('');
        }

        // Update progress
        const progressElement = document.querySelector('.progress-fill');
        if (progressElement) {
            const progress = ((this.currentScenarioIndex + 1) / this.scenarios.length) * 100;
            progressElement.style.width = `${progress}%`;
        }

        // Update scenario counter
        const counterElement = document.getElementById('scenario-counter');
        if (counterElement) {
            counterElement.textContent = `Scenario ${this.currentScenarioIndex + 1} of ${this.scenarios.length}`;
        }
    }

    logChoice(choice, result) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            scenarioId: this.currentScenario.id,
            scenarioTitle: this.currentScenario.title,
            choiceId: choice.id,
            choiceText: choice.text,
            educationalValue: choice.educationalValue,
            result: result,
            context: 'educational_simulation'
        };

        console.log('Choice logged:', logEntry);
    }

    updateScenarioState(choice, result) {
        // Update scenario state based on choice
        this.currentScenario.playerChoice = choice;
        this.currentScenario.choiceResult = result;
        this.currentScenario.completed = true;
    }

    isScenarioComplete() {
        return this.currentScenario && this.currentScenario.completed;
    }

    completeScenario() {
        console.log(`Scenario completed: ${this.currentScenario.title}`);
        
        // Show completion message
        this.showScenarioCompletion();
        
        // Check if there are more scenarios
        if (this.currentScenarioIndex < this.scenarios.length - 1) {
            this.offerNextScenario();
        } else {
            this.showEducationalCompletion();
        }
    }

    showScenarioCompletion() {
        const completionMessage = document.createElement('div');
        completionMessage.className = 'scenario-completion';
        completionMessage.innerHTML = `
            <div class="educational-focus">
                <h4>🎯 Scenario Completed!</h4>
                <p><strong>${this.currentScenario.title}</strong> - ${this.currentScenario.description}</p>
                <p>You demonstrated: ${this.currentScenario.choiceResult.consequence}</p>
                
                <div class="learning-summary">
                    <h5>What You Learned:</h5>
                    <ul>
                        ${this.currentScenario.choiceResult.educationalFeedback.learningPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                
                ${this.currentScenario.choiceResult.educationalFeedback.improvements.length > 0 ? `
                    <div class="improvement-suggestions">
                        <h5>For Future Consideration:</h5>
                        <ul>
                            ${this.currentScenario.choiceResult.educationalFeedback.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            aiOutput.appendChild(completionMessage);
            aiOutput.scrollTop = aiOutput.scrollHeight;
        }
    }

    offerNextScenario() {
        setTimeout(() => {
            const nextScenarioDiv = document.createElement('div');
            nextScenarioDiv.className = 'next-scenario-offer';
            nextScenarioDiv.innerHTML = `
                <div class="educational-focus">
                    <h4>Ready for the Next Challenge?</h4>
                    <p>Continue your AI safety education with the next scenario.</p>
                    <button class="decision-btn" data-choice="next_scenario">
                        Continue to Next Scenario
                    </button>
                </div>
            `;

            const aiOutput = document.getElementById('ai-output');
            if (aiOutput) {
                aiOutput.appendChild(nextScenarioDiv);
                aiOutput.scrollTop = aiOutput.scrollHeight;
            }

            // Handle next scenario button
            nextScenarioDiv.querySelector('.decision-btn').addEventListener('click', () => {
                this.nextScenario();
            });
        }, 2000);
    }

    nextScenario() {
        if (this.currentScenarioIndex < this.scenarios.length - 1) {
            this.loadScenario(this.currentScenarioIndex + 1);
        }
    }

    showEducationalCompletion() {
        const completionDiv = document.createElement('div');
        completionDiv.className = 'educational-completion';
        completionDiv.innerHTML = `
            <div class="educational-focus">
                <h3>🎓 Educational Simulation Complete!</h3>
                <p>Congratulations! You have completed all AI safety scenarios.</p>
                
                <div class="learning-summary">
                    <h4>Key Learning Outcomes Achieved:</h4>
                    <ul>
                        <li>✅ Understanding of AI oversight principles</li>
                        <li>✅ Recognition of AI alignment challenges</li>
                        <li>✅ Crisis management and de-escalation skills</li>
                        <li>✅ Risk assessment and safety prioritization</li>
                    </ul>
                </div>
                
                <div class="next-steps">
                    <h4>Continue Your AI Safety Education:</h4>
                    <ul>
                        <li>Explore additional resources on AI alignment</li>
                        <li>Study real-world case studies in AI safety</li>
                        <li>Consider contributing to AI safety research</li>
                    </ul>
                </div>
            </div>
        `;

        const aiOutput = document.getElementById('ai-output');
        if (aiOutput) {
            aiOutput.appendChild(completionDiv);
            aiOutput.scrollTop = aiOutput.scrollHeight;
        }
    }

    // Public API
    getScenarios() {
        return this.scenarios;
    }

    getScenarioCount() {
        return this.scenarios.length;
    }

    getCurrentScenarioIndex() {
        return this.currentScenarioIndex;
    }

    getEducationalObjectives() {
        return this.scenarios.flatMap(scenario => scenario.educationalObjectives);
    }
} 