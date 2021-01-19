export function getTemplate(options: TemplateOptions): string {
  const width = options.title.length * 5 + options.value.length * 5 + 50;
  return `
<svg viewBox="0 0 ${width} 20" width="${width}" height="20" xmlns="http://www.w3.org/2000/svg">
  <style>
    html, body { padding: 0; margin: 0; width: 100%; height: 100%; }
    .fo { width: 100%; height: 100%; }
    .w { display: flex; font-family: Verdana, "DejaVu Sans", sans-serif; border-radius: 0.2rem; overflow: hidden; font-size: 0.7rem;  }
    .k, .v { flex-grow: 1; display: flex; justify-content: center; align-items: center; text-shadow: 1px 1px rgba(0,0,0,0.3); color: #fff; line-height: 20px; padding: 0 0.3rem;  }
    .k { background: rgb(85, 85, 85); }
    .v { background: rgb(0, 136, 204); }
  </style>
  <foreignObject class="fo">
    <div class="w" xmlns="http://www.w3.org/1999/xhtml">
      <div class="k">${options.title}</div>
      <div class="v">${options.value}</div>
    </div>
  </foreignObject>
</svg>
  `
}
