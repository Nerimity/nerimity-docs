import { defineConfig, type PluginOption } from "vite";
import solid from "vite-plugin-solid";
import fs from "fs";
import path from "path";

const renameMe: () => PluginOption = () => ({
  name: "rename-me",
  async configResolved(config) {
    const markdownFilesGenerator = fs.promises.glob("../**/*.md", {
      exclude: ["../**/frontend/**"],
    });
    for await (const filePath of markdownFilesGenerator) {
      console.log(`Copying ${filePath} to public/docs...`);
      const publicDocsPath = path.join("./public", "docs");
      const fullFilePath = path.join(publicDocsPath, filePath.slice(3));
      fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });

      fs.writeFileSync(fullFilePath, fs.readFileSync(filePath), {});
    }
  },
});

export default defineConfig({
  plugins: [solid(), renameMe()],
  optimizeDeps: {
    include: ["solid-markdown > micromark", "solid-markdown > unified"],
  },
});
