'use client';
import logo from "../../../public/robot.gif";
import React, { useEffect, useState, useTransition } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Box from '@mui/material/Box';
import { Typography, Divider, List, ListItem, ListItemButton, ListItemText, TextField, styled, Avatar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { MicIcon, MicOffIcon } from "lucide-react";

const drawerWidth = 250;

export default function MyForm({ name }: { name?: string }) {
  const router = useRouter();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isloading, startTransition] = useTransition();
  const [apicallinf, setapicallinf] = useState(false);
  const [openprofile, setopenprofile] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [messages, setmessages] = useState<any[]>([]);
  const [viewportWidth, setViewportWidth] = useState(0);

  const username = name ?? "adhil";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Hooks MUST be at the top
  useEffect(() => {
    setMounted(true);
    setViewportWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  }, []);

  useEffect(() => {
    setopenprofile(false);
  }, [path]);

  useEffect(() => {
    if (mounted) {
      setTitle(transcript);
    }
  }, [transcript, mounted]);

  const redirect = (path: string) => {
    router.push(path);
  };



  // Styled component
  const Logoai = styled("img")({
    transition: "right 0.3s ease",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    position: "fixed",
    bottom: "5%",
    right: openprofile ? `${100 + drawerWidth}px` : "3%",
    display: "block",
    marginLeft: "auto",
    mixBlendMode: "multiply",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setapicallinf(true);

    setmessages([...messages, { role: 'you', parts: [{ text: title }] }]);
    setTitle('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', parts: [{ text: title }] }] }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          const aiMessage = data.messages[0];
          setmessages(prev => [...prev, aiMessage]);
        }
      } else {
        setmessages(prev => [...prev, { role: "model", parts: [{ text: "something went wrong" }] }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setapicallinf(false);
    }
  };

  return (
    <>
      {mounted &&
        ReactDOM.createPortal(
          <Box sx={{ position: "fixed", bottom: 0, right: 0, zIndex: 1000 }}>
            {openprofile &&
              <Box sx={{ position: "relative", minHeight: "300px", width: drawerWidth, bgcolor: "white", boxShadow: 24, borderRadius: 2, py: 2 }}>
                <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
                  Hi, {username}
                </Typography>
                <Divider />
                <Box sx={{ width: "100%", height: "500px", overflowY: "scroll", paddingBottom: 10, fontSize: "small" }}>
                  <List>
                    {messages.map((msg, index) => (
                      <ListItem key={index}>
                        <ListItemButton>
                          <ListItemText primary={msg.parts[0].text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "1em" }}>
                  <TextField
                    sx={{ width: "80%", background: "white", borderRadius: "8px" }}
                    placeholder="Type your message..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) startTransition(() => handleSubmit(e));
                    }}
                    disabled={apicallinf}
                  />
                  <Avatar onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening()} sx={{ bgcolor: "#ff0000ff" }}>
                    {listening ? <MicOffIcon /> : <MicIcon />}
                  </Avatar>
                </Box>
              </Box>
            }
            <Logoai onClick={() => setopenprofile(!openprofile)} src={logo.src} />
          </Box>,
          document.body
        )}
    </>
  );
}
