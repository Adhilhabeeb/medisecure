'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography, Divider, List, ListItem, ListItemButton, ListItemText, TextField, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
let username="adhil"
const drawerWidth = 250
export default function MyForm() {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  let Inputstyled=styled("input")({
    
    position:"absolute",
    bottom:20,left:0,right:0,margin:"auto",
    width:"90%",
    padding:"10px",
    borderRadius:"8px",
    border:"1px solid #ccc",
    fontSize:"16px",
   
    '& .MuiInputBase-input': {
        width:"100%",
      
        
        boxSizing:"border-box"
    
    },
  });

  const [openprofile, setopenprofile] = useState<boolean>(true)
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
    
       {openprofile &&
            ReactDOM.createPortal(
              <Box   height={{ xs: 'auto', sm: 'auto',md:"500px" }}
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                width={drawerWidth}
                  sx={{

                 
           
                  position: "fixed",
                  bottom: "5%",
                  right: "5%",
                  zIndex: 2000,
                boxSizing:"border-box",
                  bgcolor: "white",
                  borderRadius: 2,
                  minWidth: 200,
                }}
                >
                  <TextField  sx={{position:"absolute",bottom:20,left:0,right:0,margin:"auto",width:"90%",borderRadius:"8px",  zIndex: 2000,}}
             value={title}
             onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
             placeholder="Type your message..."
             onChange={(e) => setTitle(e.target.value)} 
             />
              <Box 
            
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
           
                
              
              </Box>
              
              </Box>,
              document.body
            )}
    
    </>
  );
}