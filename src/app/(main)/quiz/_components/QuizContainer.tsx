"use client";

import { useState } from "react";
import QuizList from "@/app/(main)/quiz/_components/QuizList";
import useQuizzesQuery from "@/store/queries/quiz/useQuizzesQuery";
import { QUIZ_PAGE_LIMIT } from "@/app/(main)/quiz/_constant";
import PaginationContainer from "@/components/PaginationContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TableContainer from "@/components/TableContainer";
import { TQuiz } from "@/types/quiz.type";
import QuizItem from "@/app/(main)/quiz/_components/QuizItem";

const quizHeader = ["퀴즈 ID", "발행일자", "문제", "해설", "정답", "수정"];

function QuizContainer() {
  const router = useRouter();
  const query = useQuizzesQuery;
  const handleWriteClick = () => {
    router.push(`/quiz/write`);
  };

  return (
    <section>
      <Button onClick={handleWriteClick}>퀴즈 등록</Button>
      <TableContainer<TQuiz>
        useQuery={query}
        renderRow={(quiz: TQuiz) => <QuizItem key={quiz.quizId} quiz={quiz} />}
        headers={quizHeader}
        pageLimit={QUIZ_PAGE_LIMIT}
      />
    </section>
  );
}

export default QuizContainer;
