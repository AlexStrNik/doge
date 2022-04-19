export interface TemplateProps {
  body: string;
  title: string;
}

export default ({ body, title }: TemplateProps) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="stylesheet" href="/assets/index.css" />
        </head>
        
        <body>
          <div id="root">${body}</div>
        </body>
        
        <script src="/assets/bundle.js"></script>
      </html>
    `;
};
