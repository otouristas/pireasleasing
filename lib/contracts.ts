import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ContractData {
  bookingId: string;
  bookingDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  customerLicense?: string;
  carMake: string;
  carModel: string;
  carYear: number;
  carLicensePlate: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffDate: string;
  dropoffTime: string;
  dropoffLocation: string;
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  dailyRate?: number;
  duration: number;
  extras?: string[];
}

export function generateContract(data: ContractData): jsPDF {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [11, 27, 51]; // #0B1B33
  const accentColor = [249, 200, 14]; // #F9C80E
  
  // Header Background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Company Logo (text version - you can add actual image if needed)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('AGGELOS', 105, 22, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('RENTALS', 105, 32, { align: 'center' });
  
  // Company tagline
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Premium Car Rental Services', 105, 40, { align: 'center' });
  
  // Reset colors
  doc.setTextColor(0, 0, 0);
  
  let y = 60;
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('VEHICLE RENTAL AGREEMENT', 105, y, { align: 'center' });
  y += 10;
  
  // Contract Info Box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(14, y, 182, 15, 2, 2, 'F');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text(`Contract Number: ${data.bookingId.slice(0, 13).toUpperCase()}`, 18, y + 6);
  doc.text(`Issue Date: ${data.bookingDate}`, 18, y + 11);
  y += 20;
  
  // Two-column layout for Customer and Vehicle
  const leftCol = 14;
  const rightCol = 110;
  
  // Customer Details Section
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(leftCol, y, 88, 7, 'F');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('RENTER INFORMATION', leftCol + 2, y + 5);
  y += 10;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Name:', leftCol, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerName, leftCol + 25, y);
  y += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Email:', leftCol, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerEmail, leftCol + 25, y);
  y += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Phone:', leftCol, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerPhone, leftCol + 25, y);
  y += 6;
  
  if (data.customerLicense) {
    doc.setFont('helvetica', 'bold');
    doc.text('License No:', leftCol, y);
    doc.setFont('helvetica', 'normal');
    doc.text(data.customerLicense, leftCol + 25, y);
    y += 6;
  }
  
  // Reset y for vehicle column
  let yVehicle = 70 + 10;
  
  // Vehicle Details Section
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(rightCol, yVehicle - 10, 86, 7, 'F');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('VEHICLE INFORMATION', rightCol + 2, yVehicle - 5);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Make & Model:', rightCol, yVehicle);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.carMake} ${data.carModel}`, rightCol + 30, yVehicle);
  yVehicle += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Year:', rightCol, yVehicle);
  doc.setFont('helvetica', 'normal');
  doc.text(String(data.carYear), rightCol + 30, yVehicle);
  yVehicle += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('License Plate:', rightCol, yVehicle);
  doc.setFont('helvetica', 'normal');
  doc.text(data.carLicensePlate, rightCol + 30, yVehicle);
  
  y = Math.max(y, yVehicle) + 10;
  
  // Rental Period Section
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(leftCol, y, 182, 7, 'F');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('RENTAL PERIOD', leftCol + 2, y + 5);
  y += 10;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  // Pickup details
  doc.setFont('helvetica', 'bold');
  doc.text('Pick-up:', leftCol, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.pickupDate} at ${data.pickupTime}`, leftCol + 20, y);
  y += 6;
  doc.text(`Location: ${data.pickupLocation}`, leftCol + 20, y);
  y += 8;
  
  // Dropoff details
  doc.setFont('helvetica', 'bold');
  doc.text('Drop-off:', leftCol, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.dropoffDate} at ${data.dropoffTime}`, leftCol + 20, y);
  y += 6;
  doc.text(`Location: ${data.dropoffLocation}`, leftCol + 20, y);
  y += 8;
  
  // Duration highlight
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(leftCol, y, 50, 8, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Duration: ${data.duration} day${data.duration !== 1 ? 's' : ''}`, leftCol + 2, y + 5);
  y += 15;
  
  // Pricing Section
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(leftCol, y, 182, 7, 'F');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT DETAILS', leftCol + 2, y + 5);
  y += 10;
  
  doc.setTextColor(0, 0, 0);
  
  const pricingData = [
    ['Description', 'Amount'],
    [data.dailyRate ? `Daily Rate (€${data.dailyRate.toFixed(2)}/day × ${data.duration} days)` : 'Rental Fee', `€${data.totalAmount.toFixed(2)}`],
  ];
  
  if (data.extras && data.extras.length > 0) {
    data.extras.forEach(extra => {
      pricingData.push(['+ ' + extra, 'Included']);
    });
  }
  
  autoTable(doc, {
    startY: y,
    head: [pricingData[0]],
    body: pricingData.slice(1),
    theme: 'striped',
    styles: { 
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: { 
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      lineWidth: 0.1,
      lineColor: [200, 200, 200]
    },
    columnStyles: {
      0: { cellWidth: 130 },
      1: { halign: 'right', cellWidth: 50, fontStyle: 'bold' }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    }
  });
  
  y = (doc as any).lastAutoTable.finalY + 5;
  
  // Payment Summary Box
  doc.setFillColor(232, 245, 233);
  doc.roundedRect(14, y, 182, 25, 2, 2, 'F');
  doc.setDrawColor(46, 125, 50);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, y, 182, 25, 2, 2, 'S');
  
  y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Deposit Paid (15%)', 18, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 125, 50);
  doc.text(`€${data.depositAmount.toFixed(2)} ✓`, 185, y, { align: 'right' });
  
  y += 6;
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text('Balance Due at Pick-up', 18, y);
  doc.setFont('helvetica', 'bold');
  doc.text(`€${data.balanceAmount.toFixed(2)}`, 185, y, { align: 'right' });
  
  y += 8;
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setLineWidth(0.3);
  doc.line(18, y, 192, y);
  
  y += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT', 18, y);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.text(`€${data.totalAmount.toFixed(2)}`, 185, y, { align: 'right' });
  
  doc.setTextColor(0, 0, 0);
  y += 15;
  
  // Terms and Conditions
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(leftCol, y, 182, 7, 'F');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TERMS AND CONDITIONS', leftCol + 2, y + 5);
  y += 10;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  const terms = [
    '1. Minimum Age: The renter must be at least 21 years old with a valid driver\'s license held for minimum 1 year.',
    '2. Insurance: Full insurance coverage (CDW/TP) is included in the rental price with standard excess.',
    '3. Fuel Policy: The vehicle must be returned with the same fuel level as provided at pick-up.',
    '4. Damages: Any damages, accidents, or mechanical issues must be reported to us immediately.',
    '5. Deposit Refund: The deposit will be refunded within 7 business days after vehicle return in good condition.',
    '6. Late Returns: Late returns will incur additional daily charges. Please notify us if you need to extend.',
    '7. Traffic Violations: The renter is fully responsible for any traffic fines, tolls, or violations during the rental.',
    '8. Territorial Limits: The vehicle must remain within Greece unless prior written approval is obtained.',
    '9. Cancellation: Free cancellation up to 48 hours before pick-up. See full policy for details.',
    '10. Driver: Only the named driver(s) on this agreement are authorized to operate the vehicle.',
  ];
  
  terms.forEach(term => {
    const lines = doc.splitTextToSize(term, 180);
    lines.forEach((line: string) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 16, y);
      y += 4;
    });
    y += 2;
  });
  
  // Add new page for signatures if needed
  if (y > 230) {
    doc.addPage();
    y = 30;
  } else {
    y += 10;
  }
  
  // Signatures Section
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(14, y, 182, 40, 2, 2, 'F');
  y += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SIGNATURES', 105, y, { align: 'center' });
  y += 10;
  
  // Customer signature
  doc.setFont('helvetica', 'normal');
  doc.text('Renter Signature:', 20, y);
  doc.line(55, y, 95, y);
  
  // Company signature
  doc.text('Company Representative:', 110, y);
  doc.line(162, y, 192, y);
  y += 8;
  
  // Dates
  doc.setFontSize(8);
  doc.text('Date: ' + data.bookingDate, 55, y);
  doc.text('Date: ' + data.bookingDate, 162, y);
  
  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    
    // Company info at bottom
    doc.text('Aggelos Rentals | Piraeus, Akti Themistokleous 104, Greece', 105, 283, { align: 'center' });
    doc.text('Email: piraeus@aggelosrentals.com | Phone: +30 6980 151 068', 105, 288, { align: 'center' });
    doc.text('Open 7 Days: 09:00 - 20:00 | WhatsApp: +30 6980 151 068', 105, 293, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 185, 293, { align: 'right' });
  }
  
  return doc;
}

export function downloadContract(data: ContractData) {
  const doc = generateContract(data);
  doc.save(`contract-${data.bookingId.slice(0, 8)}.pdf`);
}

export function previewContract(data: ContractData): string {
  const doc = generateContract(data);
  return doc.output('dataurlstring');
}

