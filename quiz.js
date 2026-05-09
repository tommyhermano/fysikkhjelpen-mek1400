// Fysikkhjelpen MEK1400 — quiz-logikk
// Hver quiz-side definerer: window.QUIZ_DATA = { tittel, beskrivelse, sporsmal: [...] }

(function () {
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function letterIdx(letter) { return LETTERS.indexOf(letter); }

  function init() {
    if (!window.QUIZ_DATA) return;
    const data = window.QUIZ_DATA;
    const root = document.getElementById('quiz-root');
    if (!root) return;

    const state = data.sporsmal.map(() => ({ picked: null, revealed: false }));

    function render() {
      let answered = 0, correct = 0, revealed = 0;
      state.forEach((a, i) => {
        if (a.picked) answered++;
        if (a.revealed) revealed++;
        if (a.revealed && a.picked === data.sporsmal[i].svar) correct++;
      });
      const wrong = revealed - correct;
      const pct = data.sporsmal.length
        ? Math.round((revealed / data.sporsmal.length) * 100) : 0;

      root.innerHTML = `
        <div class="score-panel">
          <div class="stat"><span class="lbl">Besvart</span><span class="val">${answered}/${data.sporsmal.length}</span></div>
          <div class="stat"><span class="lbl">Riktige</span><span class="val good">${correct}</span></div>
          <div class="stat"><span class="lbl">Feil</span><span class="val bad">${wrong}</span></div>
          <div class="progress-bar"><div style="width:${pct}%"></div></div>
        </div>
        <div class="quiz-controls">
          <button class="btn primary" id="reveal-all">Vis alle svar</button>
          <button class="btn" id="hide-all">Skjul alle svar</button>
          <button class="btn" id="reset">Tilbakestill kapittel</button>
        </div>
        <div id="qlist"></div>
      `;

      const qlist = document.getElementById('qlist');
      data.sporsmal.forEach((q, qi) => {
        const a = state[qi];
        const correctI = letterIdx(q.svar);
        const card = document.createElement('div');
        card.className = 'question';

        let optsHtml = '';
        q.options.forEach((opt, oi) => {
          const letter = LETTERS[oi];
          let cls = 'opt';
          if (a.picked === letter) cls += ' selected';
          if (a.revealed) {
            if (oi === correctI) cls += ' correct';
            else if (a.picked === letter) cls += ' wrong';
          }
          optsHtml += `<div class="${cls}" data-q="${qi}" data-letter="${letter}">
            <span class="letter">${letter}.</span>
            <span class="text">${escapeHtml(opt)}</span>
          </div>`;
        });

        let fb = '';
        if (a.revealed) {
          const ok = a.picked === q.svar;
          const cls = ok ? 'feedback correct' : 'feedback wrong';
          const verdict = ok
            ? `Riktig! Svaret er ${q.svar}.`
            : (a.picked
                ? `Feil. Du svarte ${a.picked}, riktig svar er ${q.svar}.`
                : `Riktig svar er ${q.svar}.`);
          fb = `<div class="${cls}">
            <div class="verdict">${verdict}</div>
            <div class="explain">${escapeHtml(q.forklaring)}</div>
          </div>`;
        }

        card.innerHTML = `
          <div class="num">Spørsmål ${qi + 1} av ${data.sporsmal.length}</div>
          <div class="text">${escapeHtml(q.q)}</div>
          <div class="options">${optsHtml}</div>
          ${fb}
          <div style="margin-top:12px;">
            <button class="btn" data-toggle="${qi}">${a.revealed ? 'Skjul svar' : 'Vis svar'}</button>
          </div>
        `;
        qlist.appendChild(card);
      });

      qlist.querySelectorAll('.opt').forEach(el => {
        el.addEventListener('click', () => {
          const qi = parseInt(el.getAttribute('data-q'));
          state[qi].picked = el.getAttribute('data-letter');
          render();
        });
      });
      qlist.querySelectorAll('button[data-toggle]').forEach(b => {
        b.addEventListener('click', () => {
          const qi = parseInt(b.getAttribute('data-toggle'));
          state[qi].revealed = !state[qi].revealed;
          render();
        });
      });
      document.getElementById('reveal-all').onclick = () => {
        state.forEach(a => a.revealed = true);
        render();
      };
      document.getElementById('hide-all').onclick = () => {
        state.forEach(a => a.revealed = false);
        render();
      };
      document.getElementById('reset').onclick = () => {
        if (confirm('Tilbakestille kapittelet?')) {
          for (let i = 0; i < state.length; i++) {
            state[i] = { picked: null, revealed: false };
          }
          render();
        }
      };
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
