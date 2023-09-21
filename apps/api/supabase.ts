import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mtsecclrsgvtrkfeuqxh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10c2VjY2xyc2d2dHJrZmV1cXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxMzY1NzgsImV4cCI6MjAxMDcxMjU3OH0.JzaUzVRhVg-UmvXXOr40XfivrQKH-Xi4Ho8tOMYdlDU';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
