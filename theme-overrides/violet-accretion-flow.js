// Advect detail inside the existing gas silhouette, leaving the shadow fixed.
(() => {
  let renderer;
  let unavailable = false;
  function create(texture) {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 400;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false,
      preserveDrawingBuffer: true, antialias: false, depth: false, stencil: false });
    if (!gl) return null;
    function shader(type, code) {
      const item = gl.createShader(type); gl.shaderSource(item, code); gl.compileShader(item);
      if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(item));
      return item;
    }
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, `
      attribute vec2 position; varying vec2 uv;
      void main() { uv = vec2(position.x * .5 + .5, .5 - position.y * .5); gl_Position = vec4(position, 0., 1.); }
    `));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
      precision highp float;
      varying vec2 uv; uniform sampler2D art; uniform float time; uniform float direction;
      uniform float strength; uniform float pull; uniform float flash;
      vec2 tilt(vec2 p) { return vec2(p.x * .998 + p.y * .063, -p.x * .063 + p.y * .998); }
      float lum(vec3 c) { return dot(c, vec3(.299, .587, .114)); }
      void main() {
        vec2 center = vec2(.5, .505);
        vec2 p = uv - center;
        vec2 pulledUV = center + p * (1. + pull * .16 * smoothstep(.12, .33, length(p)));
        vec4 base = texture2D(art, pulledUV);
        if (base.a < .003) { gl_FragColor = base; return; }
        vec2 aligned = vec2(p.x * .998 - p.y * .063, p.x * .063 + p.y * .998);
        vec2 plane = vec2(aligned.x, aligned.y / .205);
        float radius = length(plane);
        float angle = atan(plane.y, plane.x);
        // Kepler-like ordering: inner streams move several times faster.
        float speed = clamp(.32 * pow(.37 / max(radius, .105), 1.25), .24, 1.65);
        float phase = angle - direction * time * speed;
        float disk = 1. - smoothstep(.035, .105, abs(aligned.y));
        vec2 advected = center + tilt(vec2(cos(phase) * radius, sin(phase) * radius * .205));
        vec4 gas = texture2D(art, advected);
        float diskDetail = lum(gas.rgb) * gas.a;
        float ribbon = sin(phase * 5. + radius * 82. + sin(phase * 3. - radius * 23.) * .65);
        float diskFlow = .57 + .68 * diskDetail + .42 * pow(.5 + .5 * ribbon, 2.);

        // The lensed arch has its own moving filaments, without turning its outline.
        float r = length(p);
        float a = atan(p.y, p.x);
        float archPhase = a - direction * time * clamp(.16 / max(r, .1), .55, 1.6);
        vec4 archSample = texture2D(art, center + vec2(cos(archPhase), sin(archPhase)) * r);
        float archBands = .5 + .5 * sin(archPhase * 6. + r * 112. + sin(archPhase * 3.) * .6);
        float archFlow = .65 + .50 * pow(archBands, 3.) + .30 * lum(archSample.rgb) * archSample.a;
        float material = smoothstep(.025, .16, lum(base.rgb));
        float motion = mix(archFlow, diskFlow, disk);
        vec3 color = base.rgb * mix(1., motion, material * (.65 + strength * .35));

        // A narrow traveling highlight rides the photon ring; no whole-screen pulse.
        float photon = exp(-pow((r - .115) / .007, 2.));
        float hotspot = pow(.5 + .5 * cos(a - direction * time * 1.45), 14.);
        color += vec3(1., .84, .68) * photon * hotspot * material * (.18 + strength * .30);
        color *= 1. + flash * material * .40;
        gl_FragColor = vec4(color, base.a);
      }
    `));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const image = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);
    gl.uniform1i(gl.getUniformLocation(program, 'art'), 0);
    const uniforms = Object.fromEntries(['time','strength','direction','pull','flash'].map(name => [name, gl.getUniformLocation(program, name)]));
    gl.viewport(0, 0, 400, 400);
    canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); unavailable = true; });
    return { canvas, gl, uniforms };
  }
  window.__violetAccretionFlow = {
    draw(ctx, texture, time, strength, direction, pull = 0, flash = 0) {
      if (unavailable) return false;
      try {
        if (!renderer) renderer = create(texture);
        if (!renderer) { unavailable = true; return false; }
        const { gl, uniforms, canvas } = renderer;
        gl.uniform1f(uniforms.time, time); gl.uniform1f(uniforms.strength, strength);
        gl.uniform1f(uniforms.direction, direction); gl.uniform1f(uniforms.pull, pull);
        gl.uniform1f(uniforms.flash, flash); gl.drawArrays(gl.TRIANGLES, 0, 6);
        ctx.drawImage(canvas, 0, 0); return true;
      } catch (_) { unavailable = true; return false; }
    }
  };
})();
