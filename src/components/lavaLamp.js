export default function LavaLamp() {
    return (
        <section class="content">
            <div class="lamp">
                <div class="lava">
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob"></div>
                    <div class="blob top"></div>
                    <div class="blob bottom"></div>

                </div>
            </div>

            <svg>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <h1 class="">trying to make the red lava a clip-path. </h1>
            <p class="">so i can see the gradient background behind the white section</p>

        </section>
    )
}