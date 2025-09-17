"use client";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/firebase";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

function Page() {
  const [message, setMessage] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "medidatabase"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ ...doc.data(), id: doc.id });
      });
      const sorted = fetched.sort((a, b) => a.createdAt - b.createdAt);
      setFetchedUsers(sorted);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  const handleSignin = () => {
    if (!email.trim() || !password.trim()) {
      setMessage("⚠️ Please enter valid credentials.");
      return;
    }

    const isUser = fetchedUsers.some(
      (el) => el.email === email && el.password === password
    );

    if (isUser) {
      const userData = fetchedUsers.find((el) => el.email === email);
      localStorage.setItem("medisecureuser", JSON.stringify(userData));
      setMessage("✅ Login successful!");
      router.push("/");
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Sign In
        </Typography>

        {message && (
          <Alert severity={message.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSignin}
            fullWidth
            sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
          >
            Sign In
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link href="/signup" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Page;
