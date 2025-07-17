@@ .. @@
 Deno.serve(async (req) => {
   try {
+    // Get the URL path
+    const url = new URL(req.url);
+    const path = url.pathname.split("/").pop();
+    
+    // Handle the main endpoint or root path
+    if (!path || path === "" || path === "openai-proxy") {
+      // Continue with the OpenAI chat completion logic
+      const { messages } = await req.json();
+
+      if (!messages || !Array.isArray(messages)) {
+        return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
+      }
+
+      const completion = await openai.chat.completions.create({
+        model: "gpt-4",
+        messages,
+        temperature: 0.7,
+      });
+
+      const content = completion.choices?.[0]?.message?.content;
+
+      if (!content) {
+        return new Response(JSON.stringify({ error: "No response from AI" }), { status: 502 });
+      }
+
+      return new Response(JSON.stringify({ result: content }), {
+        status: 200,
+        headers: { "Content-Type": "application/json" },
+      });
+    }
+    
+    // If path doesn't match any endpoint
+    return new Response(
+      JSON.stringify({ error: "Invalid endpoint" }),
+      {
+        status: 404,
+        headers: { "Content-Type": "application/json" },
+      }
+    );
+  } catch (err) {
     const { messages } = await req.json();

     if (!messages || !Array.isArray(messages)) {
       return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
     }

     const completion = await openai.chat.completions.create({
       model: "gpt-4",
       messages,
       temperature: 0.7,
     });

     const content = completion.choices?.[0]?.message?.content;

     if (!content) {
       return new Response(JSON.stringify({ error: "No response from AI" }), { status: 502 });
     }

     return new Response(JSON.stringify({ result: content }), {
       status: 200,
       headers: { "Content-Type": "application/json" },
     });
-  } catch (err) {
     const message = err instanceof Error ? err.message : String(err);
     console.error("Proxy error:", err);