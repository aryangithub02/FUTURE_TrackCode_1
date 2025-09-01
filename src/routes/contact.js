const express = require('express');
const { z } = require('zod');
const Contact = require('../models/Contact');
const emailService = require('../utils/emailService');

const router = express.Router();

// Zod validation schema
const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Please provide a valid email address')
    .max(254, 'Email cannot exceed 254 characters')
    .trim()
    .toLowerCase(),
  message: z.string()
    .min(1, 'Message is required')
    .max(1000, 'Message cannot exceed 1000 characters')
    .trim()
});

// POST /api/contact
router.post('/', async (req, res, next) => {
  try {
    console.log('📝 New contact form submission received');
    console.log('📊 Request body:', { 
      name: req.body.name, 
      email: req.body.email, 
      messageLength: req.body.message?.length 
    });

    // Validate request data with Zod
    console.log('🔍 Validating request data...');
    const validatedData = contactSchema.parse(req.body);
    console.log('✅ Validation passed');

    // Create new contact document
    console.log('💾 Saving contact to database...');
    const contact = new Contact(validatedData);
    const savedContact = await contact.save();
    console.log('📩 Contact saved successfully:', savedContact._id);

    // Send email notification
    console.log('📧 Sending email notification...');
    const emailResult = await emailService.sendContactNotification(savedContact);
    
    if (emailResult.success) {
      console.log('✅ Email notification sent successfully');
    } else {
      console.warn('⚠️ Email notification failed, but contact was saved');
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: savedContact._id,
        createdAt: savedContact.createdAt,
        emailSent: emailResult.success
      }
    });

    console.log('🎉 Contact form submission completed successfully');

  } catch (error) {
    console.error('❌ Contact form submission failed:', error.message);
    next(error);
  }
});

// GET /api/contact (optional - for testing/admin purposes)
router.get('/', async (req, res, next) => {
  try {
    console.log('📋 Fetching all contacts...');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`📊 Found ${contacts.length} contacts`);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Failed to fetch contacts:', error.message);
    next(error);
  }
});

module.exports = router;