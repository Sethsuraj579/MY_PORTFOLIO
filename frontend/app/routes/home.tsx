import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import Home from "../welcome/welcome";
import type { Project } from "../../components/project";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Suraj Portfolio - Full Stack Developer" },
    { name: "description", content: "Full-stack developer showcasing web development projects and expertise" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const url = new URL("/api/projects/", apiBase);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return { projects: [] };
    }

    const projects = (await res.json()) as Project[];
    return { projects };
  } catch (error) {
    console.error("Failed to load projects", error);
    return { projects: [] };
  }
}

export default function main() {
  const { projects } = useLoaderData<{ projects: Project[] }>();
  return <Home projects={projects} />;
}
