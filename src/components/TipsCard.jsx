import React from 'react'

const TIPS = [
  'La recepción es a las 2:00 p. m. y la ceremonia a las 3:30 p. m.',
  'Llevar un abrigo ligero para disfrutar de los jardines por la noche.',
  'Olvidarse de todo y a disfrutar!!!',
]

export default function TipsCard() {
  return (
    <article className="panel-card h-full p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-800" aria-hidden="true">✦</span>
        <h3 className="font-script text-3xl text-blue-950 sm:text-4xl">Tips y notas</h3>
      </div>
      <ul className="space-y-4">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
