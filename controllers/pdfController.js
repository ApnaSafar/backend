const pdfService = require('../services/pdfServices/pdfService');
const emailService = require('../services/emailServices/emailService');

exports.downloadPDF = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const pdfBuffer = await pdfService.createPDF(name);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'attachment; filename="document.pdf"'
    });
    
    res.send(Buffer.from(pdfBuffer));

    // Send email asynchronously
    // emailService.sendPDFEmail(data.email, pdfBuffer)
    //   .then(() => console.log('Email sent successfully'))
    //   .catch(err => console.error('Email sending failed:', err));

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).send('Error generating PDF');
  }
};