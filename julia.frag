#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

vec2 complexSquare(vec2 z) {
  return vec2(
    z.x * z.x - z.y * z.y,
    2.0 * z.x * z.y
  );
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y * 2.0;
  vec2 c = vec2(-0.7, 0.27015); // Julia constant

  vec2 z = uv;
  int maxIter = 100;
  int i;
  for (i = 0; i < maxIter; i++) {
    z = complexSquare(z) + c;
    if (dot(z, z) > 4.0) break;
  }

  float t = float(i) / float(maxIter);
  vec3 color = vec3(0.5 + 0.5 * cos(6.2831 * t + vec3(0.0, 0.33, 0.67)));
  gl_FragColor = vec4(color, 1.0);
}
