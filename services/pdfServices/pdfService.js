//const puppeteer = require('puppeteer');
const { ticketTemplate } = require('./ticketTemplate');
const { jsPDF } = require('jspdf');
const html2canvas = require('html2canvas');
const wkhtmltopdf = require('wkhtmltopdf');


exports.createPDF = async (name, email, flight, seatNo) => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    const htmlContent=ticketTemplate(name,flight,seatNo);
    wkhtmltopdf(htmlContent, {
      pageSize: 'letter',
      orientation: 'portrait',
      // Add more options as needed
    })
      .on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      })
      .on('error', (error) => {
        console.error('Error generating PDF:', error);
        reject(error);
      })
      .on('data', (chunk) => {
        buffers.push(chunk);
      });
  });
  // return new Promise((resolve, reject) => {
  //   const options = {
  //     format: 'A4',
  //     border: {
  //       top: '20px',
  //       right: '20px',
  //       bottom: '20px',
  //       left: '20px'
  //     }
  //   };

  //   pdf.create(ticketTemplate(name, flight, seatNo), options).toBuffer((err, buffer) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(buffer);
  //   });
  //});
}