<!-- Adegan hero: operator di samping mesin cetak outdoor, dengan papan produksi di atasnya.
     Semua gerakan diatur lewat CSS di src/styles/global.css (bagian "Gerak & latar"). -->
<template>
  <div class="hero-visual print-scene">
    <div class="scene-board" role="img" aria-label="Contoh papan produksi Grafika Pro: order banner sedang dicetak di mesin outdoor, dua order lain menunggu.">
      <div class="board-head" aria-hidden="true">
        <span class="board-title">Papan produksi</span>
        <span class="board-live"><i></i>Langsung</span>
      </div>
      <div class="board-row is-active" aria-hidden="true">
        <div class="board-main">
          <strong>GP-2417</strong>
          <span>Banner 3 × 1 m, mesin outdoor</span>
        </div>
        <span class="board-status">
          <span class="s-printing">Sedang dicetak</span>
          <span class="s-done">Selesai cetak</span>
        </span>
        <span class="board-bar"><i></i></span>
      </div>
      <div class="board-row" aria-hidden="true">
        <div class="board-main">
          <strong>GP-2418</strong>
          <span>Stiker vinyl 500 pcs</span>
        </div>
        <span class="board-chip">Antre</span>
      </div>
      <div class="board-row board-row-last" aria-hidden="true">
        <div class="board-main">
          <strong>GP-2416</strong>
          <span>X-banner 60 × 160 cm</span>
        </div>
        <span class="board-chip is-soft">Finishing</span>
      </div>
    </div>

    <svg class="scene-svg" viewBox="0 0 520 330" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="scene-slot"><rect x="100" y="140" width="240" height="150"/></clipPath>
        <clipPath id="scene-rail"><rect x="112" y="92" width="284" height="26"/></clipPath>
      </defs>

      <!-- lantai -->
      <ellipse cx="225" cy="294" rx="215" ry="9" fill="#3f597a" opacity=".13"/>
      <ellipse cx="456" cy="294" rx="52" ry="6" fill="#3f597a" opacity=".13"/>
      <line x1="0" y1="290" x2="520" y2="290" stroke="#3f597a" stroke-opacity=".28" stroke-width="1.5"/>

      <g class="scene-machine">
        <!-- gulungan bahan di belakang -->
        <rect x="86" y="50" width="276" height="22" rx="11" fill="#f4f7f8" stroke="#93b8d0" stroke-width="1.5"/>
        <g class="media-roll">
          <circle cx="97" cy="61" r="11" fill="#93b8d0"/>
          <circle cx="97" cy="61" r="4" fill="#2c3341"/>
          <line x1="97" y1="52" x2="97" y2="56" stroke="#2c3341" stroke-width="2" stroke-linecap="round"/>
        </g>

        <!-- kaki mesin -->
        <rect x="70" y="138" width="14" height="146" fill="#3f597a"/>
        <rect x="356" y="138" width="14" height="146" fill="#3f597a"/>
        <rect x="84" y="236" width="272" height="7" fill="#3f597a" opacity=".55"/>
        <rect x="46" y="280" width="62" height="8" rx="4" fill="#2c3341"/>
        <rect x="332" y="280" width="62" height="8" rx="4" fill="#2c3341"/>

        <!-- hasil cetak yang keluar -->
        <g clip-path="url(#scene-slot)">
          <g class="sheet">
            <rect x="104" y="140" width="232" height="132" fill="#ffffff"/>
            <rect x="104" y="140" width="232" height="132" fill="#d7eff0" opacity=".55"/>
            <circle cx="290" cy="176" r="40" fill="#e4664e"/>
            <path d="M104 236 Q170 196 236 232 T336 222 V272 H104Z" fill="#3f597a"/>
            <path d="M104 252 Q180 222 250 250 T336 244 V272 H104Z" fill="#93b8d0"/>
            <text x="120" y="184" font-family="Gloock, Georgia, serif" font-size="27" fill="#2c3341">Grand</text>
            <text x="120" y="212" font-family="Gloock, Georgia, serif" font-size="27" fill="#2c3341">Opening</text>
            <rect x="100" y="270" width="240" height="5" rx="2.5" fill="#2c3341"/>
          </g>
        </g>

        <!-- badan mesin -->
        <rect x="36" y="74" width="368" height="68" rx="7" fill="#2c3341"/>
        <rect x="36" y="74" width="368" height="12" rx="6" fill="#3f597a"/>
        <rect x="112" y="92" width="284" height="26" rx="3" fill="#1d232d"/>
        <line x1="112" y1="105" x2="396" y2="105" stroke="#56606e" stroke-width="2"/>
        <g clip-path="url(#scene-rail)">
          <g class="carriage">
            <rect x="116" y="93" width="36" height="24" rx="3" fill="#e4664e"/>
            <rect x="122" y="98" width="24" height="4" rx="2" fill="#2c3341" opacity=".55"/>
            <rect x="130" y="113" width="8" height="5" fill="#f6f6f6"/>
          </g>
        </g>
        <rect x="104" y="126" width="232" height="6" rx="3" fill="#1d232d"/>

        <!-- panel kontrol -->
        <rect x="46" y="92" width="54" height="40" rx="4" fill="#3f597a"/>
        <rect x="52" y="98" width="42" height="16" rx="2" fill="#d7eff0"/>
        <rect class="panel-line" x="56" y="103" width="22" height="2.5" rx="1.2" fill="#3f597a"/>
        <rect x="56" y="108" width="30" height="2.5" rx="1.2" fill="#93b8d0"/>
        <circle class="led led-1" cx="58" cy="123" r="3" fill="#e4664e"/>
        <circle class="led led-2" cx="70" cy="123" r="3" fill="#93b8d0"/>
        <circle cx="82" cy="123" r="3" fill="#56606e"/>

        <!-- tabung tinta -->
        <rect x="350" y="56" width="9" height="18" rx="2" fill="#93b8d0"/>
        <rect x="362" y="56" width="9" height="18" rx="2" fill="#e4664e"/>
        <rect x="374" y="56" width="9" height="18" rx="2" fill="#f0c35a"/>
        <rect x="386" y="56" width="9" height="18" rx="2" fill="#56606e"/>
      </g>

      <!-- operator -->
      <g class="scene-operator">
        <g class="operator-body">
          <rect x="434" y="278" width="22" height="10" rx="5" fill="#1d232d"/>
          <rect x="460" y="278" width="22" height="10" rx="5" fill="#1d232d"/>
          <rect x="440" y="186" width="15" height="96" rx="5" fill="#2c3341"/>
          <rect x="462" y="186" width="15" height="96" rx="5" fill="#2c3341"/>
          <!-- lengan belakang memegang tablet -->
          <path d="M442 110 L428 148 L410 142" fill="none" stroke="#33496a" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          <g transform="rotate(-14 396 132)">
            <rect x="378" y="108" width="36" height="50" rx="4" fill="#2c3341"/>
            <rect x="382" y="112" width="28" height="42" rx="2" fill="#d7eff0"/>
            <rect x="386" y="118" width="20" height="3" rx="1.5" fill="#3f597a"/>
            <rect x="386" y="125" width="14" height="3" rx="1.5" fill="#93b8d0"/>
            <rect class="tablet-check" x="386" y="138" width="20" height="9" rx="2" fill="#e4664e"/>
          </g>
          <!-- badan -->
          <rect x="432" y="96" width="52" height="100" rx="14" fill="#3f597a"/>
          <path d="M444 96 h28 v62 a14 14 0 0 1 -28 0z" fill="#e4664e"/>
          <rect x="452" y="84" width="12" height="16" rx="5" fill="#dba888"/>
          <!-- kepala -->
          <g class="operator-head">
            <circle cx="457" cy="70" r="19" fill="#e9b99a"/>
            <path d="M437 68 a20 20 0 0 1 40 0 z" fill="#2c3341"/>
            <rect x="424" y="64" width="26" height="6" rx="3" fill="#2c3341"/>
          </g>
          <!-- lengan depan mengetuk tablet -->
          <path d="M476 112 L470 156" fill="none" stroke="#3f597a" stroke-width="13" stroke-linecap="round"/>
          <g class="operator-arm">
            <path d="M470 156 L420 140" fill="none" stroke="#3f597a" stroke-width="12" stroke-linecap="round"/>
            <circle cx="414" cy="138" r="7" fill="#e9b99a"/>
          </g>
        </g>
      </g>
    </svg>
    <span class="blue-block"></span>
  </div>
</template>
