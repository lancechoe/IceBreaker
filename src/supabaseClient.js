// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kpjafmuxwsmszprrnucq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwamFmbXV4d3Ntc3pwcnJudWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTYzOTEsImV4cCI6MjA2NDQzMjM5MX0.eiwb434gvCCgy9aVp3rASinO8oWQDxZca9bu7e3_ynk";

export const supabase = createClient(supabaseUrl, supabaseKey);
