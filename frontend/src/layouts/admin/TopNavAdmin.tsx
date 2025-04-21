"use client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import styled from "styled-components";

// Styled Component cho Container
const Container = styled.div`
  display: flex;
  height: 6.3rem; /* Tương đương với h-16 */
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  padding: 0 4rem;
  .title {
    font-size: 2.4rem;
    font-weight: 500;
  }
`;

// Styled Component cho h1


export default function TopNavAdmin({ title }: { title: string }) {
  return (
    <Container>
      <span className="title">{title}</span>
      {/* <ThemeToggle /> */}
      <div>bút</div>
      <ThemeToggle />
    </Container>
  );
}
