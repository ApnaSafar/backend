const puppeteer=require('puppeteer');
const {ticketTemplate}=require('./ticketTemplate')

exports.createPDF=async(name, email, flight)=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();

    const html=ticketTemplate(name, flight);
    await page.setContent(html);



    const pdfBuffer = await page.pdf({

        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      await browser.close();

      console.log(pdfBuffer);

  return pdfBuffer;
}