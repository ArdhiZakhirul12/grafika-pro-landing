<!-- Adegan bagian "Kerja tim nggak harus saling tunggu":
     pekerja bingung dikepung pertanyaan, lalu tugas berikutnya muncul dan semuanya jelas.
     Gerakan diatur lewat CSS di src/styles/global.css (bagian "Adegan pekerja bingung"). -->
<template>
  <div class="campaign-scene" role="img" aria-label="Ilustrasi: seorang pekerja percetakan bingung harus mengerjakan apa, lalu tugas berikutnya muncul dari Grafika Pro.">
    <div class="chat-bubble chat-1" aria-hidden="true">Yang ini udah dicetak belum?</div>
    <div class="chat-bubble chat-2" aria-hidden="true">Kapan deadline order ini?</div>
    <div class="chat-bubble chat-3" aria-hidden="true">Habis ini ngerjain apa?</div>

    <div class="task-card" aria-hidden="true">
      <span class="task-label"><span class="tiny-square"></span>Tugas berikutnya</span>
      <strong>GP-2417, banner 3 × 1 m</strong>
      <span class="task-step">Potong dan pasang mata ayam</span>
      <span class="task-chip">Giliran Anda</span>
    </div>

    <svg viewBox="0 0 480 330" aria-hidden="true" focusable="false">
      <!-- lantai -->
      <line x1="0" y1="300" x2="480" y2="300" stroke="#93b8d0" stroke-opacity=".45" stroke-width="1.5"/>
      <ellipse cx="170" cy="304" rx="150" ry="7" fill="#000" opacity=".3"/>
      <ellipse cx="362" cy="304" rx="48" ry="6" fill="#000" opacity=".3"/>

      <!-- meja finishing -->
      <rect x="52" y="222" width="10" height="78" fill="#93b8d0"/>
      <rect x="278" y="222" width="10" height="78" fill="#93b8d0"/>
      <rect x="62" y="262" width="216" height="6" fill="#93b8d0" opacity=".5"/>
      <rect x="36" y="212" width="268" height="12" rx="3" fill="#f6f6f6"/>
      <!-- tumpukan cetakan -->
      <rect x="58" y="196" width="70" height="16" fill="#d7eff0"/>
      <rect x="58" y="184" width="70" height="12" fill="#f6f6f6"/>
      <rect x="58" y="174" width="70" height="10" fill="#e4664e"/>
      <rect x="144" y="200" width="78" height="12" fill="#f6f6f6"/>
      <rect x="144" y="190" width="78" height="10" fill="#93b8d0"/>
      <!-- gulungan -->
      <rect x="236" y="190" width="56" height="22" rx="11" fill="#f6f6f6"/>
      <circle cx="281" cy="201" r="11" fill="#93b8d0"/>
      <circle cx="281" cy="201" r="4" fill="#2c3341"/>
      <!-- nota yang berserakan -->
      <g class="loose-note note-a"><rect x="96" y="156" width="26" height="32" fill="#fff"/><rect x="100" y="162" width="16" height="2.5" fill="#93b8d0"/><rect x="100" y="168" width="12" height="2.5" fill="#93b8d0"/></g>
      <g class="loose-note note-b"><rect x="176" y="168" width="24" height="30" fill="#fff"/><rect x="180" y="174" width="14" height="2.5" fill="#e4664e"/><rect x="180" y="180" width="10" height="2.5" fill="#93b8d0"/></g>

      <!-- pekerja -->
      <g class="worker">
        <rect x="336" y="290" width="24" height="10" rx="5" fill="#f6f6f6"/>
        <rect x="364" y="290" width="24" height="10" rx="5" fill="#f6f6f6"/>
        <rect x="342" y="226" width="16" height="68" rx="5" fill="#3f597a"/>
        <rect x="366" y="226" width="16" height="68" rx="5" fill="#3f597a"/>
        <!-- lengan kiri memegang kertas -->
        <path d="M338 154 L322 190 L328 220" fill="none" stroke="#7fa6c0" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="rotate(-10 318 226)"><rect x="304" y="212" width="26" height="32" fill="#fff"/><rect x="308" y="218" width="16" height="2.5" fill="#93b8d0"/><rect x="308" y="224" width="12" height="2.5" fill="#93b8d0"/><rect x="308" y="230" width="14" height="2.5" fill="#93b8d0"/></g>
        <circle cx="328" cy="221" r="7" fill="#e9b99a"/>
        <!-- badan -->
        <rect x="334" y="142" width="56" height="96" rx="14" fill="#93b8d0"/>
        <path d="M347 142 h30 v58 a15 15 0 0 1 -30 0z" fill="#e4664e"/>
        <rect x="356" y="130" width="12" height="16" rx="5" fill="#dba888"/>
        <!-- kepala -->
        <g class="worker-head">
          <circle cx="362" cy="116" r="20" fill="#e9b99a"/>
          <path d="M341 113 a21 21 0 0 1 42 0 z" fill="#3f597a"/>
          <rect x="339" y="109" width="46" height="6" rx="3" fill="#3f597a"/>
          <circle cx="355" cy="121" r="2" fill="#2c3341"/>
          <circle cx="369" cy="121" r="2" fill="#2c3341"/>
        </g>
        <!-- lengan kanan: garuk kepala (bingung) -->
        <g class="arm-confused">
          <path d="M386 154 L412 134" fill="none" stroke="#93b8d0" stroke-width="12" stroke-linecap="round"/>
          <g class="arm-scratch">
            <path d="M412 134 L390 104" fill="none" stroke="#93b8d0" stroke-width="11" stroke-linecap="round"/>
            <circle cx="387" cy="100" r="7" fill="#e9b99a"/>
          </g>
        </g>
        <!-- lengan kanan: jempol (sudah jelas) -->
        <g class="arm-clear">
          <path d="M386 154 L410 176 L420 148" fill="none" stroke="#93b8d0" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="421" cy="144" r="8" fill="#e9b99a"/>
          <rect x="418" y="126" width="6" height="14" rx="3" fill="#e9b99a"/>
        </g>
      </g>

      <!-- tanda tanya -->
      <g class="question-marks" font-family="Gloock, Georgia, serif">
        <text class="q q-1" x="322" y="88" font-size="30" fill="#e4664e">?</text>
        <text class="q q-2" x="354" y="70" font-size="40" fill="#ffffff">?</text>
        <text class="q q-3" x="404" y="82" font-size="26" fill="#93b8d0">?</text>
      </g>
      <!-- tanda beres -->
      <g class="clear-badge">
        <circle cx="362" cy="64" r="17" fill="#e4664e"/>
        <path d="M353 64 l6 7 l12 -13" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </div>
</template>
