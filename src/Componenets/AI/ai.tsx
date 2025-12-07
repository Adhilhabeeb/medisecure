'use client';
import logo from "../../../public/robot.gif"
import React, { useEffect, useTransition } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

console.log("speach",SpeechRecognition,"amd",useSpeechRecognition)
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography, Divider, List, ListItem, ListItemButton, ListItemText, TextField, styled, Button, Avatar, InputAdornment } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { MicIcon, MicOffIcon, SendHorizontalIcon, SendToBackIcon } from "lucide-react";

const drawerWidth = 250
export default function MyForm({name}:{name?:string}) {

  // Get the full viewport width in pixels
const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// Calculate one-third of the width
const oneThirdWidth = viewportWidth / 3.5;

// Log the result
console.log("One third of the viewport width is:", oneThirdWidth, "px");

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);


   const [isloading, startTransition] = useTransition();
   const [apicallinf, setapicallinf] = useState(false)
let username=  name??"adhil"
  const [openprofile, setopenprofile] = useState<boolean>(false)
let path=usePathname()
useEffect(() => {
setopenprofile(false)
}, [path])
const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
if (mounted && !browserSupportsSpeechRecognition) {
  return <span>Browser doesn't support speech recognition.</span>;
}

  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  
  let Logoai=styled("img")({
    transition: "right 0.3s ease", // ✅ Add this line
    width:"100px",
   height:"100px",
   borderRadius:"50%",
position:"fixed",
   bottom:"5%",
   right: openprofile?`${10+drawerWidth}px`:"3%",
   display:"block",
   marginLeft:"auto",
  
mixBlendMode:"multiply",
  });

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');
  type geminiparts={text:string}[]
  type users="model" | "user"
type use={
  role:"model"|"you",
parts:geminiparts
}

  const [messages, setmessages] = useState<use[]>([])
  const user = { name: 'User' }; // replace with real user data
useEffect(() => {
 console.log(transcript,"trabnnnnnnnnnnn")
setTitle(transcript)
}, [transcript])


  const handleSubmit =  async (event: React.FormEvent) => {
    
    event.preventDefault();
    setapicallinf(true)

    setmessages([...messages, {role:'you',parts:[{text:title}] }])
    setTitle('')
    const data = messages

    try {
      const response = await fetch('/api/ai', { // Your API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({messages: [...messages, {role:'user',parts:[{text:title}]}]}),
      });

      if (response.ok) {

           const data = await response.json();
        // console.log('Post created successfully:', data);

      // console.log('Medical helper response:', data);

     if (data.messages && data.messages.length > 0) {
        const aiMessage = data.messages[0];
        // console.log("aimessgais ",aiMessage)
        setmessages(prevMessages => [...prevMessages, aiMessage]);
setapicallinf(false)        
        throw new Error('No response from server');
      }

        // Clear form or show success message
        setTitle('');
        setContent('');
      } else {
      
      
        setmessages(prev=>[...prev,{role:"model",parts:[{text:"something went wrong"}]}])
setapicallinf(false)        

        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
setapicallinf(false)        

      console.error('Error submitting form:', error);
    }
  };
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="title">Title:</label>
    //     <input
    //       type="text"
    //       id="title"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="content">Content:</label>
    //     <textarea
    //       id="content"
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>

    <>
 
       { isMounted &&
            ReactDOM.createPortal(
            
            
         
<Box  sx={{position:"fixed",bottom:0,right:0, zIndex:1000}}>
{openprofile &&
              <Box   

              sx={{
                position:"relative",
              minHeight:"300px",height:"auto",
                width:drawerWidth,
           display:"block",
           marginLeft:"auto",
   
                bgcolor:"white",
                boxShadow: 24,
                borderRadius:2,
              py:2,
                
               
                boxSizing:"border-box",
              }}
                >
             {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <Button sx={{borderRadius:"50%",padding:"2vh",bgcolor:"red"}}  onClick={SpeechRecognition.stopListening}>Stop</Button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
<Typography variant="h6" sx={{ my: 2, textAlign:"center", }}>
                  Hi, {username}
                </Typography> <Divider />
             <Box sx={{width:"100%",height:"500px",overflowY:"scroll",paddingBottom:10,position:"relative",fontSize:"small"}}  >



    <List    >
                 
                 { messages.length>0 &&
                  messages.map((msg, index) => 
                  {


                    console.log(msg,"is eah messha")
                    return     (<>
                  
                   <ListItem 
                    sx={{
                   width:"100%",
                   height:"auto",
                 
                      display: "flex",
                    
                     
                   
                    }}
                  
                  >
                    <ListItemButton   >
                    
                      <ListItemText primary={
                        
               msg.parts[0].text as string 
                   
                        }   />
                    </ListItemButton>
                  </ListItem>
                  
                  </>)
                  }
                  
              
                  
                )
              
                 }
                </List>
       
             </Box>


         <Box sx={{background:"#ffffff",display:"flex",flexDirection:"row",justifyContent:"space-around" ,alignItems:"center",padding:"1em",width:"100%",minHeight:"14px"}}>
<Box sx={{flexBasis:"80%",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",background:"blue",width:"100%"}}>
               <TextField sx={{background:"white",
        
                

 
    width:"100%",
  
    borderRadius:"8px",

    fontSize:"16px",
    border:"none",
      outline:"none",
    '& .MuiInputBase-input': {
        width:"100%",border:"none",
      outline:"none",
        
     
    
    },
   
              }}  
           
             onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                startTransition(()=>{
                handleSubmit(e);

                })
              }
            }}

            onChange={(e) => setTitle(e.target.value)} value={title} 
             placeholder="Type your message..." disabled={ apicallinf}
            />
  </Box>
  <Box sx={{flexBasis:"20%",display:"flex",flexDirection:"column",position:"relative",padding:"5%",boxSizing:"border-box",gap:"4px"}}>
       <Avatar  onClick={()=>{
        if (listening) {
        SpeechRecognition.stopListening()
          
        }else{
                   setTitle("")
         SpeechRecognition.startListening()  
        }
        
        
       
        

         }} sx={{bgcolor:"#dd0707ff",border:"0.5px solid black"}}   >
{listening? <MicOffIcon/> :
  <MicIcon /> }
</Avatar> 

  </Box>
         </Box>
               
              {/* <Box 
            
                sx={{

                  overflowY: "scroll",
                
                    position: "fixed",
                    msOverflowY: "scroll",
                    height: 450,
                    width: drawerWidth,
                    bottom: 70,
                    right: 0,
                    padding: 2,
                    boxSizing: "border-box",
               
                }}
              >
                <Typography variant="h6" sx={{ my: 2 }}>
                  Hi, {"adhil"}
                </Typography>  <Divider />

              
                <List>
                 
                 { messages.length>0 &&
                  messages.map((msg, index) => (<>
                  
                   <ListItem 
                    sx={{
                   
                      display: "flex",
                      width: "100%",
                      mb: 1,
                     
                      justifyContent: msg.role==="user"?"end":"start" ,
                      alignItems: "center",
                    }}
                  
                  >
                    <ListItemButton  sx={{ width:"100%",  bgcolor: msg.role==="user"?"#e0f7fa":"#f1f8e9",borderRadius:2, }}>
                      <ListItemText  primary={msg.content} />
                    </ListItemButton>
                  </ListItem>
                  
                  </>))
              
                 }
                </List>
           
                
              
              </Box> */}
            
              </Box>
              }
              <Logoai  onClick={()=>setopenprofile(!openprofile)} src={logo.src}/>
             </Box>
      
              
         ,
              document.body
            )}
    
    </>
  );
}