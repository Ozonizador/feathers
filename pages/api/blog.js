import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data: blogPost, error: errorBlogPost } = await supabase
        .from("blogs")
        .select("*")
        .eq("notified", false)
        .single();

      if (errorBlogPost) {
        throw errorBlogPost;
      }

      if (blogPost) {
        const { data: profiles, error: errorProfiles } = await supabase
          .from("profiles")
          .select()
          .eq("accepts_notification_email", true);

        if (errorProfiles) {
          throw errorProfiles;
        }

        let formData = {
          templateId: "",
          data: {
            title: blogPost.title,
            link: `/blog/${blogPost.slug}`,
          },
        };

        profiles.forEach(async (profile) => {
          formData.email = profile.email;
          formData.data.first_name = profile.name;

          await fetch("/api/mail", {
            method: "POST",
            body: JSON.stringify(formData),
          });
        });
        res.status(200).json(profiles);
      }
    } catch (error) {
      console.error("Error handling data:", error.message);
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
