import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import jsPDF from 'jspdf';

interface TimeSlot {
  time: string;
  description: string;
}

function App() {
  const [schedule, setSchedule] = useState<TimeSlot[]>([
    { time: "5", description: "" },
    { time: "6", description: "" },
    { time: "7", description: "" },
    { time: "8", description: "" },
    { time: "9", description: "" },
    { time: "10", description: ""},
    { time: "11", description: ""},
    { time: "12", description: ""},
    { time: "1", description: "" },
    { time: "2", description: "" },
    { time: "3", description: "" },
    { time: "4", description: "" },
    { time: "5", description: "" },
    { time: "6", description: "" },
    { time: "7", description: "" },
    { time: "8", description: "" },
    { time: "9", description: "" },
    { time: "10", description: ""},
    { time: "11", description: ""},
  ]);

  const [morningReflection, setMorningReflection] = useState("");
  const [eveningReflection, setEveningReflection] = useState("");
  const [saved, setSaved] = useState(false);

  const handleDescriptionChange = (index: number, newDescription: string) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], description: newDescription };
    setSchedule(newSchedule);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const downloadAsPDF = () => {
    const pdf = new jsPDF();
    let yPos = 20;

    // Add Special Elite font
    pdf.addFont(
      'https://fonts.gstatic.com/s/specialelite/v18/XLYgIZbkc4JPUL5CVArUVL0nhncESXFtUsM.ttf',
      'Special Elite',
      'normal'
    );

    // Set font
    pdf.setFont("Special Elite");
    pdf.setFontSize(16);
    pdf.text("Daily Schedule", 105, yPos, { align: "center" });
    
    // Morning Question
    yPos += 20;
    pdf.setFontSize(12);
    pdf.text("The morning question, What good shall I do this day?", 20, yPos);
    yPos += 10;
    pdf.text(morningReflection || "[No reflection written]", 20, yPos);

    // Schedule
    yPos += 20;
    pdf.text("Schedule:", 20, yPos);
    yPos += 10;

    schedule.forEach((slot) => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(`${slot.time}:`, 20, yPos);
      const description = slot.description || "-";
      pdf.text(description, 35, yPos);
      yPos += 10;
    });

    // Evening Question
    yPos += 10;
    if (yPos > 270) {
      pdf.addPage();
      yPos = 20;
    }
    pdf.text("Evening question, What good have I done today?", 20, yPos);
    yPos += 10;
    pdf.text(eveningReflection || "[No reflection written]", 20, yPos);

    // Save the PDF
    pdf.save("franklin-schedule.pdf");
  };

  return (
    <div className="min-h-screen bg-[#f4e4bc] p-4 sm:p-8 font-['Special_Elite']">
      <div className="max-w-4xl mx-auto bg-[#f4e4bc] border-2 border-black p-4 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daily Schedule</h1>
          <p className="text-sm italic">Anno Domini MMXXV</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-8">
          <div className="border-2 border-black p-4">
            <p className="text-sm sm:text-base">
              The morning question,<br />
              What good shall I do this day?
            </p>
          </div>

          <div className="border-2 border-black p-4">
            <textarea 
              className="w-full bg-transparent resize-none focus:outline-none min-h-[60px]"
              placeholder="Write your morning reflection here..."
              value={morningReflection}
              onChange={(e) => setMorningReflection(e.target.value)}
            />
          </div>
        </div>

        <div className="border-2 border-black mb-8">
          {schedule.map((slot, index) => (
            <div key={index} className="grid grid-cols-[80px_1fr] border-b border-black last:border-b-0">
              <div className="border-r border-black p-2 text-center">
                {slot.time}
              </div>
              <div className="p-2">
                <input
                  type="text"
                  value={slot.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your task..."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-8">
          <div className="border-2 border-black p-4">
            <p className="text-sm sm:text-base">
              Other Goals,<br />
              To accomplish today:
            </p>
          </div>
          <p>“Dost thou love life? Then do not squander Time; for that’s the Stuff Life is made of.”<br />
- Poor Richard’s Almanack, 1746</p>

          <div className="border-2 border-black p-4">
            <textarea 
              className="w-full bg-transparent resize-none focus:outline-none min-h-[60px]"
              placeholder="Write your evening reflection here..."
              value={eveningReflection}
              onChange={(e) => setEveningReflection(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c1810] text-white rounded hover:bg-[#1a0f0a] transition-colors"
          >
            <Save size={16} />
            {saved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={downloadAsPDF}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c1810] text-white rounded hover:bg-[#1a0f0a] transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
