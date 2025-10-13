export   async function Emailsenter(name,hospitalname,email){
const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: "Hello from Next.js",
      text: `hi sir you havea a  message from  ${hospitalname}   your username is the ${name}   and your hospital name is the ${hospitalname}`,
      html: `<b>HTML body hi sir you havea a  message from  ${hospitalname}   your username is the ${name}   and your hospital name is the ${hospitalname}</b>`,
    }),
  });
  const data = await res.json();
  console.log(data,"is the data fro email sent");

  };


