'use client'
import React ,{useEffect,useRef} from 'react'
import Typed from 'typed.js'
type Props = {}

const Typer = (props: Props) => {
  const typerRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const typed = new Typed(typerRef.current, {
      strings: [
        "Can help You With Terms and Conditions of a Fishy Company",
        "Can Help you with your Research topic",
        "Can Analyze Your Expenses from Your Bank Statements",
        "Can explain Complex Government Papers as if You are 5 years old",
        "Can explain you, your friends notes a night before your exams",
        "Can explain you Shakespeare's plays in a way you can understand",
        "Can Break Down Complex Medical Reports for Easy Understanding",
        "Can Explain Astronomy Papers in a Storytelling Format"
      ],
      // typeSpeed: 100,
      // backSpeed: 100,

      backDelay: 4000,
      smartBackspace: true,
      loop: true,
      showCursor: true,
      cursorChar: "__"
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <span ref={typerRef} className='font-bold md:text-4xl text-xl capitalize'/>
  )
}
export default Typer