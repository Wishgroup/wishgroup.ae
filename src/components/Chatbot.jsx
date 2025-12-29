import React, { useState, useEffect, useRef } from 'react'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Knowledge Base - Wish Group Information
const WISH_GROUP_KNOWLEDGE = {
  about: {
    description: "Wish Group is a diversified business conglomerate with operations spanning seven countries. We're committed to excellence, integrity, and service across all our ventures.",
    vision: "To become a number one capital company by making wishes come true and achieving together.",
    values: "Excellence, Integrity, and Service guide everything we do."
  },
  services: {
    realEstate: {
      name: "Real Estate & Development",
      description: "Comprehensive real estate solutions including property development, investment opportunities, and premium commercial and residential projects across strategic locations.",
      projects: ["Wish Harbour Ciprea", "Prime Bond", "World Capital Centre", "The Bay", "Dow Hotel"],
      solutions: ["Property investment opportunities", "Commercial real estate development", "Residential projects", "Mixed-use developments", "Real estate consulting"]
    },
    hospitality: {
      name: "Hospitality & Tourism",
      description: "Premium hospitality experiences including luxury resorts, hotels, and tourism services that combine lifestyle, ocean experiences, and trusted value.",
      projects: ["Wish Harbour Ciprea", "Beverley Air", "Island Luxury", "Crystal Lagoon Experience"],
      solutions: ["Luxury resort development", "Hotel management", "Tourism services", "Hospitality consulting", "Event management"]
    },
    trading: {
      name: "Food & Trading",
      description: "Global trading services specializing in premium seafood and food products. Prime Wish Trading LLC connects the world to high-quality products with rigorous food-safety standards.",
      projects: ["Prime Wish Trading LLC"],
      products: ["Premium seafood", "Fresh catches", "Processed marine products", "Food commodities"],
      solutions: ["Global food distribution", "Seafood trading", "Food safety compliance", "Supply chain management", "Export services"]
    },
    investment: {
      name: "Investment & Finance",
      description: "Strategic investment sourcing and capital management across diverse sectors, creating winning outcomes for partners and stakeholders.",
      solutions: ["Strategic investment opportunities", "Capital management", "Portfolio diversification", "Investment consulting", "Partnership opportunities"]
    },
    agriculture: {
      name: "Agriculture",
      description: "Sustainable agricultural operations and food production, contributing to food security and sustainable practices.",
      solutions: ["Agricultural investments", "Sustainable farming", "Food production", "Agricultural consulting"]
    }
  },
  ventures: {
    primeWish: {
      name: "Prime Wish Trading LLC",
      description: "Premium food products exporter specializing in high-quality seafood. We combine rigorous food-safety standards with an agile global distribution network.",
      focus: "Seafood trading, food safety, global distribution"
    },
    wishHarbour: {
      name: "Wish Harbour Ciprea",
      description: "A premier real estate and hospitality development combining luxury living with exceptional ocean experiences.",
      focus: "Real estate development, luxury hospitality"
    },
    wishWorld: {
      name: "Wish World",
      description: "A global platform for growth and purpose - a curated network of businesses, communities, and initiatives spanning industries, cultures, and continents.",
      focus: "Global business network, strategic partnerships"
    },
    wishBrands: {
      name: "Wish Brands",
      description: "Our portfolio of consumer brands delivering excellence and innovation to markets worldwide.",
      focus: "Brand development, consumer products"
    },
    primeBond: {
      name: "Prime Bond",
      description: "Strategic investment and financial services connecting opportunities with capital.",
      focus: "Investment services, financial solutions"
    }
  },
  contact: {
    email: "info@wishgroup.ae",
    phone: "+971 4259 7167",
    phone2: "+971 4259 4795",
    address: "4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive Business Bay, Dubai - U.A.E",
    poBox: "P.O. BOX: 417425, Dubai UAE"
  }
}

// Conversation Flow States
const CONVERSATION_STATES = {
  GREETING: 'greeting',
  DISCOVERING_NEED: 'discovering_need',
  UNDERSTANDING_PROBLEM: 'understanding_problem',
  PROVIDING_SOLUTION: 'providing_solution',
  CLOSING: 'closing'
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversationState, setConversationState] = useState(CONVERSATION_STATES.GREETING)
  const [userContext, setUserContext] = useState({
    interest: null,
    problem: null,
    needs: [],
    conversationCount: 0
  })
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize with proactive greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getProactiveGreeting()
      addBotMessage(greeting)
      setConversationState(CONVERSATION_STATES.DISCOVERING_NEED)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current && !showInquiryForm) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [isOpen, showInquiryForm])

  const getProactiveGreeting = () => {
    const greetings = [
      "Hello! 👋 Welcome to Wish Group. I'm here to help you discover how we can support your business goals. What brings you to Wish Group today?",
      "Hi there! 🌟 Welcome to Wish Group. I'd love to understand what you're looking for - are you interested in investment opportunities, real estate, hospitality, or trading services?",
      "Greetings! 🚀 I'm your Wish Group assistant. To better assist you, could you tell me what area interests you most - real estate development, hospitality, trading, investments, or something else?"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  const getProactiveQuestion = (context) => {
    const questions = [
      "What specific challenge or opportunity are you exploring today?",
      "Are you looking for investment opportunities, business partnerships, or specific services?",
      "What industry or sector are you most interested in learning about?",
      "Is there a particular project or venture of ours that caught your attention?",
      "What would help you move forward with your business goals today?"
    ]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  const analyzeUserIntent = (message) => {
    const lowerMessage = message.toLowerCase()
    const intent = {
      type: null,
      service: null,
      urgency: 'normal',
      keywords: []
    }

    // Service detection
    if (lowerMessage.includes('real estate') || lowerMessage.includes('property') || lowerMessage.includes('development')) {
      intent.type = 'service'
      intent.service = 'realEstate'
      intent.keywords.push('real estate')
    } else if (lowerMessage.includes('hospitality') || lowerMessage.includes('hotel') || lowerMessage.includes('resort') || lowerMessage.includes('tourism')) {
      intent.type = 'service'
      intent.service = 'hospitality'
      intent.keywords.push('hospitality')
    } else if (lowerMessage.includes('trading') || lowerMessage.includes('food') || lowerMessage.includes('seafood') || lowerMessage.includes('prime wish')) {
      intent.type = 'service'
      intent.service = 'trading'
      intent.keywords.push('trading')
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('finance') || lowerMessage.includes('capital')) {
      intent.type = 'service'
      intent.service = 'investment'
      intent.keywords.push('investment')
    } else if (lowerMessage.includes('agriculture') || lowerMessage.includes('farming')) {
      intent.type = 'service'
      intent.service = 'agriculture'
      intent.keywords.push('agriculture')
    }

    // Problem/need detection
    if (lowerMessage.includes('need') || lowerMessage.includes('looking for') || lowerMessage.includes('want') || lowerMessage.includes('require')) {
      intent.type = 'need'
    } else if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('challenge') || lowerMessage.includes('help')) {
      intent.type = 'problem'
      intent.urgency = 'high'
    } else if (lowerMessage.includes('inquiry') || lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      intent.type = 'contact'
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('what')) {
      intent.type = 'information'
    }

    // Venture detection
    if (lowerMessage.includes('prime wish')) {
      intent.type = 'venture'
      intent.service = 'primeWish'
    } else if (lowerMessage.includes('wish harbour') || lowerMessage.includes('ciprea')) {
      intent.type = 'venture'
      intent.service = 'wishHarbour'
    } else if (lowerMessage.includes('wish world')) {
      intent.type = 'venture'
      intent.service = 'wishWorld'
    } else if (lowerMessage.includes('wish brands')) {
      intent.type = 'venture'
      intent.service = 'wishBrands'
    }

    return intent
  }

  const generateIntelligentResponse = (userMessage, intent, context) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Handle greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
      return {
        text: "Hello! I'm excited to help you explore Wish Group's opportunities. What specific area interests you - real estate, hospitality, trading, investments, or one of our ventures?",
        nextState: CONVERSATION_STATES.DISCOVERING_NEED,
        updateContext: { conversationCount: context.conversationCount + 1 }
      }
    }

    // Handle service inquiries
    if (intent.type === 'service' && intent.service) {
      const service = WISH_GROUP_KNOWLEDGE.services[intent.service]
      if (service) {
        return {
          text: `Excellent choice! ${service.name} is one of our core strengths.\n\n${service.description}\n\n${service.solutions ? `We can help with:\n${service.solutions.map(s => `• ${s}`).join('\n')}\n\n` : ''}What specific aspect interests you most, or do you have a particular challenge you're facing?`,
          nextState: CONVERSATION_STATES.UNDERSTANDING_PROBLEM,
          updateContext: { 
            interest: intent.service,
            needs: [...context.needs, intent.service]
          }
        }
      }
    }

    // Handle venture inquiries
    if (intent.type === 'venture' && intent.service) {
      const venture = WISH_GROUP_KNOWLEDGE.ventures[intent.service]
      if (venture) {
        return {
          text: `Great question! ${venture.name} is one of our key ventures.\n\n${venture.description}\n\nFocus: ${venture.focus}\n\nWould you like to know more about how this venture can help with your specific needs, or are you interested in partnership opportunities?`,
          nextState: CONVERSATION_STATES.PROVIDING_SOLUTION,
          updateContext: { interest: intent.service }
        }
      }
    }

    // Handle problems/challenges
    if (intent.type === 'problem' || intent.urgency === 'high') {
      return {
        text: "I understand you're facing a challenge. Let me help you find a solution. Can you tell me more about the specific problem or situation you're dealing with? This will help me connect you with the right resources or solutions from Wish Group.",
        nextState: CONVERSATION_STATES.UNDERSTANDING_PROBLEM,
        updateContext: { problem: userMessage }
      }
    }

    // Handle needs
    if (intent.type === 'need') {
      return {
        text: "I'd love to help you find exactly what you need. Based on what you've mentioned, let me suggest some solutions:\n\n" +
              (context.interest ? 
                `For ${WISH_GROUP_KNOWLEDGE.services[context.interest]?.name || 'your area of interest'}, we offer:\n${WISH_GROUP_KNOWLEDGE.services[context.interest]?.solutions?.map(s => `• ${s}`).join('\n') || 'comprehensive solutions'}\n\n` : 
                "We have solutions across:\n• Real Estate & Development\n• Hospitality & Tourism\n• Food & Trading\n• Investment & Finance\n• Agriculture\n\n") +
              "Which of these aligns best with what you're looking for?",
        nextState: CONVERSATION_STATES.PROVIDING_SOLUTION,
        updateContext: { needs: [...context.needs, userMessage] }
      }
    }

    // Handle about/information requests
    if (intent.type === 'information') {
      return {
        text: `${WISH_GROUP_KNOWLEDGE.about.description}\n\n${WISH_GROUP_KNOWLEDGE.about.vision}\n\n${WISH_GROUP_KNOWLEDGE.about.values}\n\nWe operate across seven countries with diverse ventures. What would you like to explore further - our services, specific projects, or partnership opportunities?`,
        nextState: CONVERSATION_STATES.DISCOVERING_NEED
      }
    }

    // Handle contact requests
    if (intent.type === 'contact') {
      return {
        text: `Absolutely! Here's how you can reach us:\n\n📧 Email: ${WISH_GROUP_KNOWLEDGE.contact.email}\n📞 Phone: ${WISH_GROUP_KNOWLEDGE.contact.phone} or ${WISH_GROUP_KNOWLEDGE.contact.phone2}\n📍 Address: ${WISH_GROUP_KNOWLEDGE.contact.address}\n📮 ${WISH_GROUP_KNOWLEDGE.contact.poBox}\n\nWould you like to submit a detailed inquiry through our form? I can help you with that!`,
        nextState: CONVERSATION_STATES.CLOSING
      }
    }

    // Default intelligent response
    if (context.interest) {
      const service = WISH_GROUP_KNOWLEDGE.services[context.interest]
      return {
        text: `Based on your interest in ${service?.name || 'our services'}, I'd like to understand better:\n\n${getProactiveQuestion(context)}\n\nThis will help me provide you with the most relevant solutions and opportunities.`,
        nextState: CONVERSATION_STATES.DISCOVERING_NEED
      }
    }

    // Generic proactive response
    return {
      text: "That's interesting! To provide you with the best guidance, could you help me understand:\n\n" + getProactiveQuestion(context) + "\n\nOr would you prefer to explore our services, ventures, or submit an inquiry?",
      nextState: CONVERSATION_STATES.DISCOVERING_NEED
    }
  }

  const handleQuickReply = (reply) => {
    if (reply === 'inquiry') {
      setShowInquiryForm(true)
      addBotMessage("Perfect! Let's get your inquiry submitted. Please fill out the form below with your details, and I'll make sure it reaches our team right away.")
      setConversationState(CONVERSATION_STATES.CLOSING)
    } else if (reply === 'services') {
      const servicesText = `Wish Group offers comprehensive solutions across multiple sectors:\n\n` +
        `🏢 **Real Estate & Development**\n${WISH_GROUP_KNOWLEDGE.services.realEstate.description}\n\n` +
        `🏨 **Hospitality & Tourism**\n${WISH_GROUP_KNOWLEDGE.services.hospitality.description}\n\n` +
        `🦐 **Food & Trading**\n${WISH_GROUP_KNOWLEDGE.services.trading.description}\n\n` +
        `💰 **Investment & Finance**\n${WISH_GROUP_KNOWLEDGE.services.investment.description}\n\n` +
        `🌾 **Agriculture**\n${WISH_GROUP_KNOWLEDGE.services.agriculture.description}\n\n` +
        `Which service area would you like to explore further, or do you have a specific challenge we can help solve?`
      addBotMessage(servicesText)
      setConversationState(CONVERSATION_STATES.DISCOVERING_NEED)
    } else if (reply === 'contact') {
      const contactText = `Here's how to reach us:\n\n📧 **Email:** ${WISH_GROUP_KNOWLEDGE.contact.email}\n📞 **Phone:** ${WISH_GROUP_KNOWLEDGE.contact.phone}\n📍 **Address:** ${WISH_GROUP_KNOWLEDGE.contact.address}\n📮 ${WISH_GROUP_KNOWLEDGE.contact.poBox}\n\nWould you like to submit an inquiry, or do you have a specific question I can help answer?`
      addBotMessage(contactText)
      setConversationState(CONVERSATION_STATES.DISCOVERING_NEED)
    } else if (reply === 'about') {
      const aboutText = `${WISH_GROUP_KNOWLEDGE.about.description}\n\n**Our Vision:** ${WISH_GROUP_KNOWLEDGE.about.vision}\n\n**Our Values:** ${WISH_GROUP_KNOWLEDGE.about.values}\n\nWe operate across seven countries with diverse ventures including Prime Wish Trading, Wish Harbour Ciprea, Wish World, and more.\n\nWhat would you like to know more about - our ventures, services, or partnership opportunities?`
      addBotMessage(aboutText)
      setConversationState(CONVERSATION_STATES.DISCOVERING_NEED)
    } else if (reply === 'ventures') {
      const venturesText = `Our key ventures include:\n\n` +
        `🦐 **Prime Wish Trading LLC**\n${WISH_GROUP_KNOWLEDGE.ventures.primeWish.description}\n\n` +
        `🏖️ **Wish Harbour Ciprea**\n${WISH_GROUP_KNOWLEDGE.ventures.wishHarbour.description}\n\n` +
        `🌍 **Wish World**\n${WISH_GROUP_KNOWLEDGE.ventures.wishWorld.description}\n\n` +
        `🏷️ **Wish Brands**\n${WISH_GROUP_KNOWLEDGE.ventures.wishBrands.description}\n\n` +
        `💼 **Prime Bond**\n${WISH_GROUP_KNOWLEDGE.ventures.primeBond.description}\n\n` +
        `Which venture interests you most, or are you looking for partnership opportunities?`
      addBotMessage(venturesText)
      setConversationState(CONVERSATION_STATES.DISCOVERING_NEED)
    }
  }

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      type: 'bot',
      text,
      timestamp: new Date()
    }])
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text,
      timestamp: new Date()
    }])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    addUserMessage(userMessage)
    setInputMessage('')

    // Analyze intent and generate intelligent response
    setTimeout(() => {
      const intent = analyzeUserIntent(userMessage)
      const response = generateIntelligentResponse(userMessage, intent, userContext)
      
      // Update context
      if (response.updateContext) {
        setUserContext(prev => ({ ...prev, ...response.updateContext }))
      }
      
      // Update conversation state
      if (response.nextState) {
        setConversationState(response.nextState)
      }
      
      // Add bot response
      addBotMessage(response.text)
      
      // Proactive follow-up for business propulsion
      if (response.nextState === CONVERSATION_STATES.PROVIDING_SOLUTION) {
        setTimeout(() => {
          addBotMessage("Would you like me to help you submit an inquiry so our team can provide you with detailed information and next steps?")
        }, 2000)
      }
    }, 500)
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    if (!inquiryData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Enhance inquiry message with context
    const enhancedMessage = `${inquiryData.message}\n\n[Context: Interest in ${userContext.interest || 'general inquiry'}, Conversation state: ${conversationState}]`

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inquiryData,
          message: enhancedMessage
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: data.message || 'Thank you! Your inquiry has been submitted. We will get back to you soon.' })
        setInquiryData({ name: '', email: '', phone: '', message: '' })
        setShowInquiryForm(false)
        addBotMessage("Excellent! Your inquiry has been submitted successfully. Our team will review it and get back to you within 24-48 hours. Is there anything else I can help you with today?")
        setConversationState(CONVERSATION_STATES.CLOSING)
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit inquiry. Please try again.' })
      }
    } catch (error) {
      console.error('Chatbot inquiry error:', error)
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInquiryData(prev => ({ ...prev, [name]: value }))
  }

  const quickReplies = [
    { text: 'Our Services', action: 'services' },
    { text: 'Our Ventures', action: 'ventures' },
    { text: 'Submit Inquiry', action: 'inquiry' },
    { text: 'Contact Info', action: 'contact' }
  ]

  return (
    <>
      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 90px;
          z-index: 9998;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .chatbot-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #A6033F;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(60, 76, 89, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .chatbot-button:hover {
          background: #8B0235;
          box-shadow: 0 3px 12px rgba(60, 76, 89, 0.2);
        }

        .chatbot-button svg {
          width: 28px;
          height: 28px;
          stroke: white;
          fill: none;
        }

        .chatbot-button .close-icon {
          display: none;
        }

        .chatbot-button.open .close-icon {
          display: block;
        }

        .chatbot-button.open .chat-icon {
          display: none;
        }

        .chatbot-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          max-width: calc(100vw - 40px);
          height: 600px;
          max-height: calc(100vh - 120px);
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(60, 76, 89, 0.1);
          box-shadow: 0 4px 16px rgba(60, 76, 89, 0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          background: #A6033F;
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .chatbot-header-info h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chatbot-header-info p {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #F8F9FA;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chatbot-message {
          display: flex;
          gap: 10px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-message.user {
          flex-direction: row-reverse;
        }

        .message-bubble {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 18px;
          word-wrap: break-word;
          white-space: pre-wrap;
          line-height: 1.4;
        }

        .message-bubble.bot {
          background: #ffffff;
          color: #3C4C59;
          border: 1px solid rgba(60, 76, 89, 0.08);
          border-bottom-left-radius: 4px;
        }

        .message-bubble.user {
          background: #A6033F;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .message-avatar.bot {
          background: #A6033F;
          color: white;
        }

        .message-avatar.user {
          background: #BACBD9;
          color: #3C4C59;
        }

        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px 20px;
          background: #ffffff;
          border-top: 1px solid rgba(60, 76, 89, 0.1);
        }

        .quick-reply-button {
          padding: 8px 16px;
          border: 1px solid #A6033F;
          background: #ffffff;
          color: #A6033F;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .quick-reply-button:hover {
          background: #A6033F;
          color: white;
        }

        .chatbot-input-area {
          padding: 16px 20px;
          background: #ffffff;
          border-top: 1px solid rgba(60, 76, 89, 0.1);
        }

        .chatbot-input-form {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .chatbot-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid rgba(60, 76, 89, 0.15);
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          resize: none;
          max-height: 100px;
          font-family: inherit;
          background: #ffffff;
          color: #3C4C59;
        }

        .chatbot-input:focus {
          border-color: #A6033F;
          box-shadow: 0 0 0 3px rgba(166, 3, 63, 0.1);
        }

        .chatbot-send-button {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #A6033F;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .chatbot-send-button svg {
          stroke: white;
          fill: none;
        }

        .chatbot-send-button:hover {
          background: #8B0235;
        }

        .chatbot-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chatbot-send-button:disabled svg {
          stroke: white;
          opacity: 0.5;
        }

        .inquiry-form {
          padding: 20px;
          background: white;
          overflow-y: auto;
          flex: 1;
        }

        .inquiry-form h3 {
          margin: 0 0 20px;
          color: #333;
          font-size: 18px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          color: #666;
          font-size: 13px;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #A6033F;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-submit-button {
          width: 100%;
          padding: 12px;
          background: #A6033F;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .form-submit-button:hover:not(:disabled) {
          background: #8B0235;
        }

        .form-submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-message {
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          text-align: center;
        }

        .status-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .back-to-chat {
          padding: 8px 16px;
          background: rgba(60, 76, 89, 0.05);
          border: 1px solid rgba(60, 76, 89, 0.1);
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #3C4C59;
          margin-bottom: 16px;
          transition: all 0.2s;
          font-weight: 500;
        }

        .back-to-chat:hover {
          background: rgba(60, 76, 89, 0.1);
          border-color: rgba(60, 76, 89, 0.2);
        }

        @media (max-width: 480px) {
          .chatbot-container {
            bottom: 10px;
            right: 10px;
          }

          .chatbot-window {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            bottom: 70px;
            right: 0;
          }
        }

        @media (min-width: 481px) and (max-width: 1200px) {
          .chatbot-container {
            right: 70px;
          }
        }
      `}</style>

      <div className="chatbot-container">
        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-avatar">💬</div>
              <div className="chatbot-header-info">
                <h3>Wish Group Assistant</h3>
                <p>We're here to help</p>
              </div>
            </div>

            {!showInquiryForm ? (
              <>
                <div className="chatbot-messages">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`chatbot-message ${msg.type}`}>
                      <div className={`message-avatar ${msg.type}`}>
                        {msg.type === 'bot' ? '🤖' : '👤'}
                      </div>
                      <div className={`message-bubble ${msg.type}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 1 && (
                  <div className="quick-replies">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        className="quick-reply-button"
                        onClick={() => handleQuickReply(reply.action)}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}

                <div className="chatbot-input-area">
                  <form onSubmit={handleSendMessage} className="chatbot-input-form">
                    <textarea
                      ref={inputRef}
                      className="chatbot-input"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      rows="1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="chatbot-send-button"
                      disabled={!inputMessage.trim()}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="inquiry-form">
                <button
                  className="back-to-chat"
                  onClick={() => {
                    setShowInquiryForm(false)
                    setSubmitStatus(null)
                  }}
                >
                  ← Back to Chat
                </button>
                <h3>Submit Your Inquiry</h3>
                {submitStatus && (
                  <div className={`status-message ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleInquirySubmit}>
                  <div className="form-group">
                    <label htmlFor="inquiry-name">Full Name *</label>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      value={inquiryData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-email">Email Address *</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={inquiryData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-phone">Phone Number</label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      name="phone"
                      value={inquiryData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-message">Your Message *</label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      value={inquiryData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="form-submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        <button
          className={`chatbot-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          <svg className="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </>
  )
}

export default Chatbot
