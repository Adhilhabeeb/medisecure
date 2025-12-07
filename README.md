  <Box sx={{background:"red",display:"flex",flexDirection:"row",justifyContent:"space-between" ,alignItems:"center",padding:"10px"}}>
           
                 <TextField sx={{background:"white",
        
                

    bottom:20,
    width:"80%",
  
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
                startTransition(()=>{
                handleSubmit(e);

                })
              }
            }}

            onChange={(e) => setTitle(e.target.value)} value={title} 
             placeholder="Type your message..." disabled={ apicallinf}
            />
        
      {/* <Button sx={{borderRadius:"50%",bgcolor:"green"}}   onClick={SpeechRecognition.startListening}>Start</Button> */}
           <Avatar   sx={{ width: "20%", height: "20%" }}>
  <MicIcon />
</Avatar> 
            
             </Box>