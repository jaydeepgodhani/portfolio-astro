"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { dateToReadable, getMapOfPosts } from "../helpers/utilities";

const PostList = ({ content }) => {
  const postMap = getMapOfPosts(content);
  const years = [...postMap.keys()];

  return (
    <LayoutGroup>
      <div className="space-y-2">
        <AnimatePresence mode="sync">
          {years.map((year) => (
            <motion.div
              key={year}
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <motion.h2
                layout
                className="font-heading text-2xl py-6 text-primary"
              >
                {year}
              </motion.h2>

              <AnimatePresence mode="sync">
                {postMap.get(year).map((obj) => (
                  <motion.div
                    key={obj.date}
                    // remove layout from exit items
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-row py-4"
                  >
                    <div className="w-1/6 text-primary">
                      {dateToReadable(obj.date)}
                    </div>

                    <motion.div
                      variants={{
                        hidden: {},
                        show: { transition: {} },
                      }}
                      initial="hidden"
                      animate="show"
                      layout
                      className="w-auto"
                    >
                      <div>
                        <Link
                          href={`/posts/${obj.link}`}
                          className="shadow-none hover:shadow-none block mb-2 text-primary"
                        >
                          {obj.title}
                        </Link>
                        {obj.tags?.map((t) => (
                          <span
                            key={t}
                            className="inline-block py-1 px-2 mr-4 rounded-md bg-[rgb(var(--color-code-bg))] text-secondary text-sm"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default PostList;
