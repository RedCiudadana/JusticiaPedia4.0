export interface Blog {
  id: string;
  title: string;
  subtitulo: string;
  thumbnail: string;
  fecha: string;
  duracion_lectura: number;
  autor: string;
  body: string;
  tipo_blog: 'análisis' | 'noticias' | 'opinión' | 'reportaje' | 'entrevistas' | 'procesos de selección';
  etiquetas?: string[];
  destacado?: boolean;
  media?: Array<{
    tipo: 'imagen' | 'video';
    archivo: string;
    descripcion?: string;
  }>;
}

// Para compatibilidad con componentes existentes
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  imageUrl: string;
  category: string;
  author?: string;
  readTime?: number;
  views?: number;
  featured?: boolean;
  tags?: string[];
}

export const newsArticles: NewsArticle[] = [];

// Cargar blogs desde el CMS (carpeta src/content/blogs)
const blogModules = import.meta.glob('/src/content/blogs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return { frontmatter: {}, body: content };
  
  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter: any = {};

  // Parse YAML frontmatter simple (supports plain key/value + simple lists)
  const lines = frontmatterStr.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle list blocks like:
    // etiquetas:
    //   - Magistrados
    //   - Seleccion
    if (/^\s*[^:]+:\s*$/.test(line)) {
      const listKey = line.replace(':', '').trim();
      const listValues: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        if (/^\s*-\s+/.test(nextLine)) {
          listValues.push(nextLine.replace(/^\s*-\s+/, '').trim());
          j += 1;
          continue;
        }
        if (!nextLine.trim()) {
          j += 1;
          continue;
        }
        break;
      }
      if (listValues.length > 0) {
        frontmatter[listKey] = listValues;
        i = j - 1;
        continue;
      }
    }

    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    if (key && value) {
      if (value === 'true') frontmatter[key.trim()] = true;
      else if (value === 'false') frontmatter[key.trim()] = false;
      else if (!isNaN(Number(value))) frontmatter[key.trim()] = Number(value);
      else if (value.startsWith('[')) {
        try {
          frontmatter[key.trim()] = JSON.parse(value);
        } catch {
          frontmatter[key.trim()] = value;
        }
      } else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }
  }
  
  return { frontmatter, body };
}

export const blogs: Blog[] = Object.entries(blogModules).map(([path, module], index) => {
  const content = module || '';
  const { frontmatter, body } = parseFrontmatter(content);
  const filename = path.split('/').pop()?.replace('.md', '') || `blog-${index}`;
  
  return {
    id: frontmatter.id || filename,
    title: frontmatter.title || '',
    subtitulo: frontmatter.subtitulo || frontmatter.subtitle || '',
    thumbnail: frontmatter.thumbnail || '',
    fecha: frontmatter.fecha || new Date().toISOString().split('T')[0],
    duracion_lectura: frontmatter.duracion_lectura || 5,
    autor: frontmatter.autor || '',
    body: body,
    tipo_blog: frontmatter.tipo_blog || 'noticias',
    etiquetas: frontmatter.etiquetas || [],
    destacado: frontmatter.destacado || false,
    media: frontmatter.media || [],
  };
});

export function convertBlogsToNewsArticles(blogs: Blog[]): NewsArticle[] {
  return blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    excerpt: blog.subtitulo,
    content: blog.body,
    date: blog.fecha,
    imageUrl: blog.thumbnail,
    category: blog.tipo_blog.charAt(0).toUpperCase() + blog.tipo_blog.slice(1),
    author: blog.autor,
    readTime: blog.duracion_lectura,
    featured: blog.destacado,
    tags: blog.etiquetas,
  }));
}
