import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NovelGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [index, setIndex] = useState([]);
  const [wordCount, setWordCount] = useState(20000);
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateIndex = async () => {
    setLoading(true);
    const generatedIndex = [
      { chapter: "Introducción", subchapters: ["Contexto", "Personajes"] },
      { chapter: "Desarrollo", subchapters: ["Conflicto", "Clímax"] },
      { chapter: "Conclusión", subchapters: ["Desenlace"] },
    ];
    setIndex(generatedIndex);
    setLoading(false);
  };

  const generateNovel = async () => {
    setLoading(true);
    let novelContent = "";
    index.forEach((section) => {
      novelContent += `\\n# ${section.chapter}\\n`;
      section.subchapters.forEach((sub) => {
        novelContent += `\\n## ${sub}\\nLorem ipsum dolor sit amet...\\n`;
      });
    });
    setNovel(novelContent);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generador de Novelas con IA</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input placeholder="Audiencia" value={audience} onChange={(e) => setAudience(e.target.value)} />
          <Button onClick={generateIndex} disabled={loading}>
            {loading ? "Generando..." : "Generar Índice"}
          </Button>
        </CardContent>
      </Card>
      {index.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <h2 className="text-xl font-bold">Índice</h2>
          {index.map((item, idx) => (
            <div key={idx} className="mt-2">
              <strong>{item.chapter}</strong>
              <ul className="list-disc pl-6">
                {item.subchapters.map((sub, subIdx) => (
                  <li key={subIdx}>{sub}</li>
                ))}
              </ul>
            </div>
          ))}
          <Input
            type="number"
            placeholder="Número de palabras"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            className="mt-4"
          />
          <Button onClick={generateNovel} disabled={loading} className="mt-2">
            {loading ? "Generando novela..." : "Generar Novela"}
          </Button>
        </motion.div>
      )}
      {novel && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <h2 className="text-xl font-bold">Novela Generada</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">{novel}</pre>
        </motion.div>
      )}
    </div>
  );
}
