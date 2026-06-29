"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
}

export default function AddGradeBtn({ onClick }: Props) {
  return <Button onClick={onClick}>Add Grades</Button>;
}
