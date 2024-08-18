"use client";

import useQuizzesQuery from "@/store/queries/quiz/useQuizzesQuery";
import { QUIZ_PAGE_LIMIT } from "@/app/(main)/quiz/_constant";
import { buttonVariants } from "@/components/ui/button";
import TableContainer from "@/components/TableContainer";
import { TQuiz } from "@/types/quiz.type";
import QuizItem from "@/app/(main)/quiz/_components/QuizItem";
import Link from "next/link";
import clsx from "clsx";

const quizHeader = ["퀴즈 ID", "발행일자", "문제", "해설", "정답", "수정"];

function QuizContainer() {
  const query = useQuizzesQuery;

  return (
    <section>
      <Link
        href="/quiz/write"
        className={clsx(
          buttonVariants({ variant: "default", size: "icon" }),
          "fixed bottom-10 right-10 w-14 h-14 flex items-center justify-center !text-2xl !rounded-full"
        )}
      >
        +
      </Link>
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
