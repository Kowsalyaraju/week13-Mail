import Navbar from "./Navbar";
import Footer from "./Footer";
import * as XLSX from "xlsx"
import { useState } from "react";
import axios from "axios"
function App() {

const[sub,setsub] = useState("")
const[text,settext] = useState("")
const[emaillist,setemaillist] = useState("")
const[status,setstatus] = useState(false)

function handlesub(event)
{
  setsub(event.target.value)
}

function handletext(event)
{
  settext(event.target.value)
}

function handlefile(event)
{
  const file = event.target.files[0];

  const reader = new FileReader();

  reader.onload = function (event) {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetname = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetname];
    const emailist = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
    const totalemail = emailist.map(function (item) {
      return item.A;
    });

    console.log(totalemail);
    setemaillist(totalemail)
  };

  reader.readAsBinaryString(file);
}

function send()
{
  setstatus(true)
  axios.post("http://localhost:5000/sendmail",{sub:sub,text:text,emaillist:emaillist})

   .then(function(data)
      {
        if(data.data==true)
        {
          alert("Send Successfully")
          setstatus(false)
        }
        else
        {
          alert("Failed to send")
        }
      })
      
}

  return (
    <div className="bg-blue-300">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full md:w-[70%] lg:w-[50%] bg-white min-h-[450px] border rounded-xl p-6">
          <div className="flex flex-col gap-6">

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-xl font-bold md:w-24">Subject: </label>
              <input
                onChange={handlesub} value={sub}
                type="text"
                placeholder="enter subject here...."
                className="border border-black rounded-md w-full h-10 px-3"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <label className="text-xl font-bold md:w-24">Text :</label>
              <textarea
                onChange={handletext} value={text}
                placeholder="enter text here...."
                className="border border-black rounded-md w-full h-32 p-3"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-xl font-bold md:w-24">File :</label>
              <input
                onChange={handlefile}
                type="file"
                className="border-4 border-dashed p-2 w-full"
              />
            </div>

            <p className="text-center md:text-left md:ml-52">
              Total Emails in the file: {emaillist.length}
            </p>

            <button onClick={send} className="bg-blue-500 text-white rounded-md h-10 px-6 w-full md:w-auto md:self-center">
              {status?"Sending":"Send"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );



}

export default App;
