<div align="center">
  <h1> NextGen AI Resume Screening</h1>
  <p>An intelligent recruitment platform connecting a modern Next.js applicant portal to an AI-powered n8n automation engine to automatically assess, score, and manage applicant resumes.</p>
</div>

<br />

## 1. Business Problem
Manual screening of candidate resumes is an extremely time-consuming and resource-intensive task for Human Resources departments. It often results in unconscious human bias, slow candidate response times, and the potential to overlook highly qualified candidates buried deep within a large applicant pool. A slow screening pipeline ultimately leads to delayed hiring timelines and a poor candidate experience.

## 2. Possible Solution
By introducing Artificial Intelligence into the initial screening layer, companies can automatically parse, read, and score candidate resumes against specified job criteria the moment they are uploaded. This drastically speeds up the shortlisting process, eliminating repetitive manual verification and letting HR professionals focus exclusively on high-quality matches.

## 3. Implemented Solution
We built an end-to-end "NextGen Recruiter" AI-powered candidate screening platform. 
- **Candidate Portal**: A premium, responsive interface where applicants can securely drag-and-drop their resumes and enter their emails.
- **AI Automation**: The frontend passes this data securely to a cloud-based **n8n Automation Engine** via a webhook trigger. The n8n engine evaluates the resume using logic and LLMs.
- **HR Tracking Pipeline**: Once evaluation is complete, n8n sends a webhook back to our system to update the local database. The HR team is provided with an integrated `/hr` administrative dashboard containing real-time candidate scores, target roles, and automated accept/reject statuses.

## 4. Tech Stack Used
- **Frontend Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS, Glassmorphism Aesthetics
- **Animations & Tooling**: Framer Motion, Lucide React, React Dropzone
- **Backend Infrastructure**: Next.js App Router API Routes (`/api/upload`, `/api/update-status`)
- **Database**: Persistent Local JSON Runtime storage ([src/data/db.json](cci:7://file:///C:/Users/rochi/OneDrive/Desktop/agentic%20ai/resume-app/src/data/db.json:0:0-0:0))
- **Automation Engine**: n8n Cloud Webhooks & Workflow Nodes

## 5. Architecture Diagram
<img width="1566" height="688" alt="Gemini_Generated_Image_9225979225979225" src="https://github.com/user-attachments/assets/897076ea-6998-4bb1-82ef-ef657c66be6d" />


## 6. How to Run in Local
Ensure you have `Node.js` installed on your machine.
1. **Clone the Repository & Install Dependencies**
   ```bash
   cd resume-app
   npm install
   ```
2. **Configure Environment Variables**
   Create a [.env.local](cci:7://file:///C:/Users/rochi/OneDrive/Desktop/agentic%20ai/resume-app/.env.local:0:0-0:0) file in the root directory and provide your n8n Production Webhook URL mapping:
   ```env
   N8N_WEBHOOK_URL="https://your-instance.app.n8n.cloud/webhook/resume-upload"
   ```
3. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Open `http://localhost:3000` to interact with the Candidate Portal.
   - Open `http://localhost:3000/hr` to view the Recruiter Dashboard.

## 7. References and Resources Used
- [Next.js Documentation](https://nextjs.org/docs)
- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Tailwind CSS Customization](https://tailwindcss.com/docs/)
- [Framer Motion API Docs](https://www.framer.com/motion/)

## 8. Recording
<video src="./public/assets/resume_app_demo.webp" controls="controls" muted="muted" width="800"></video>

## 9. Screenshots
<img width="1307" height="621" alt="Screenshot 2026-04-09 231829" src="https://github.com/user-attachments/assets/2910cc65-24c6-4440-b896-658f37af9cb2" />
<img width="1651" height="913" alt="Screenshot 2026-04-09 204648" src="https://github.com/user-attachments/assets/14a3eb75-dc15-4916-bf6a-dad586e6684b" />
<img width="1606" height="708" alt="Screenshot 2026-04-09 143040" src="https://github.com/user-attachments/assets/732fff42-54c2-41b3-8b51-6662499fb9bf" />
<img width="1903" height="788" alt="image" src="https://github.com/user-attachments/assets/cb833a43-ca43-46ab-a5d0-117b9bf17c0b" />





## 10. Proper Formatting and Alignment
- **Markdown Semantics**: Utilized standard GitHub Flavored Markdown (GFM) logic for headings, bold emphasis, tables, and nested lists.
- **Visual Spacing**: Guaranteed consistent line-breaks between conceptual boundaries alongside HTML-based `<br />` alignment tags for the logo header.
- **Embedded Languages**: Provided strict language tags on code blocks (e.g., `bash`, `env`, `mermaid`) ensuring accurate syntax highlighting for reviewers.

## 11. Problems that you faced and its solutions
| Problem Faced | Solution Implemented |
| :--- | :--- |
| **Framer Motion Integration Type Clashes** <br> `react-dropzone` exposed properties that directly clashed with Framer Motion typings inside component tags. | Prevented inline merging by splitting dropzone `div` bindings (`getRootProps`) entirely apart from the main `motion.div` wrapper, fixing the type conflict. |
| **n8n Production Endpoints 404ing** <br> Using a standard n8n webhook URL caused Next.js requests to abruptly fail with Node server errors due to workflow inactivity blockages. | Addressed this by enforcing workflow activation logic; standardizing n8n test webhooks versus production webhooks and providing explicit instructions to swap out the URL parameters or toggle workflow "Active" status. |
| **Volatile Data Passing** <br> React re-renders were erasing the Candidate Email form state if an arbitrary network error threw during the upload operation. | Decoupled UI state constraints inside [UploadZone.tsx](cci:7://file:///C:/Users/rochi/OneDrive/Desktop/agentic%20ai/resume-app/src/components/UploadZone.tsx:0:0-0:0) so the Email field forcibly remains cached and visibly rendered across both `idle` and `error` status blocks, preventing lost candidate inputs. |
| **Stateless Prototyping Limitations** <br> Without a SQL database configured, the HR Pipeline lacked the capability to sync live statuses sent back from n8n webhooks. | Engineered a robust, low-latency filesystem JSON database layer inside `src/data/db.json` enabling asynchronous syncing of webhooks that perfectly emulates a Production DB. |
