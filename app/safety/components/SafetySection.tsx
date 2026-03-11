import React from 'react'

type Props = {
  id?: string
  title: string
  lead?: React.ReactNode
  children?: React.ReactNode
}

export default function SafetySection({ id, title, lead, children }: Props) {
  return (
    <section id={id} className="bg-white/5 p-6 rounded-xl shadow-lg text-white mb-5">
      <h2 className="text-2xl font-semibold text-sky-100 mb-2">{title}</h2>
      {lead ? <p className="text-sky-100 mb-3">{lead}</p> : null}
      <div className="prose prose-invert prose-a:text-indigo-300 prose-li:marker:text-sky-300">
        {children}
      </div>
    </section>
  )
}
