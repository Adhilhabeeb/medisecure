'use client';
import logo from "../../../public/robot.gif"
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography, Divider, List, ListItem, ListItemButton, ListItemText, TextField, styled } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
const drawerWidth = 250
export default function MyForm({name}:{name?:string}) {
let username=  name??"adhil"
  const [openprofile, setopenprofile] = useState<boolean>(false)
let path=usePathname()
useEffect(() => {
setopenprofile(false)
}, [path])

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
   right: openprofile?"12%":"3%",
   display:"block",
   marginLeft:"auto",
  
mixBlendMode:"multiply",
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [messages, setmessages] = useState<Record<string,string>[]>([])
  const user = { name: 'User' }; // replace with real user data
useEffect(() => {
 console.log(messages,"messagessss")
}, [messages])


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setmessages([...messages, {role:'user',content:title}])
    setTitle('')
    const data = messages

    try {
      const response = await fetch('/api/ai', { // Your API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({messages: [...messages, {role:'user',content:title}]}),
      });

      if (response.ok) {

           const data = await response.json();
        console.log('Post created successfully:', data);

      console.log('Medical helper response:', data);

     if (data.messages && data.messages.length > 0) {
        const aiMessage = data.messages[0];
        setmessages(prevMessages => [...prevMessages, { role: 'assistant', content: aiMessage.content }]);
      } else {
        throw new Error('No response from server');
      }
        // Clear form or show success message
        setTitle('');
        setContent('');
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
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
            
            
         
<Box sx={{position:"fixed",bottom:0,right:0, zIndex:1000}}>
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
          
<Typography variant="h6" sx={{ my: 2, textAlign:"center", }}>
                  Hi, {username}
                </Typography> <Divider />
             <Box sx={{width:"100%",height:"500px",overflowY:"scroll",paddingBottom:10,position:"relative",fontSize:"small"}}  >



    <List    >
                 
                 { messages.length>0 &&
                  messages.map((msg, index) => (<>
                  
                   <ListItem 
                    sx={{
                   width:"100%",
                   height:"auto",
                 
                      display: "flex",
                    
                     
                   
                    }}
                  
                  >
                    <ListItemButton   >
                      <ListItemText  primary={msg.content} />
                    </ListItemButton>
                  </ListItem>
                  
                  </>))
              
                 }
                </List>
       
             </Box>


            <Box sx={{background:"red"}}>
                <TextField sx={{background:"white",
        
                
    position:"absolute",
    bottom:20,left:0,right:0,margin:"auto",
    width:"90%",
  display:"block",
    borderRadius:"8px",

    fontSize:"16px",
   
    '& .MuiInputBase-input': {
        width:"100%",border:"none",
      outline:"none",
        
        boxSizing:"border-box"
    
    },
   
              }}  
             onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}

            onChange={(e) => setTitle(e.target.value)} value={title} 
             placeholder="Type your message..."
            />
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
            
              </Box>}
              <Logoai  onClick={()=>setopenprofile(!openprofile)} src={logo.src}/>
             </Box>
      
              
         ,
              document.body
            )}
    
    </>
  );
}