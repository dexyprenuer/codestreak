import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define all routes that require an authenticated active session
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/analyze(.*)',
  '/challenges(.*)',
  '/history(.*)',
  '/api/((?!webhooks).*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // RESOLVE THE AUTH CONTEXT BEFORE CALLING PROTECT:
    const authObject = await auth();
    await authObject.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static asset files unless found in search query parameters
    '/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|png|webp|jpg|jpeg|ico|txt|woff2?|ico|csv|docx|xlsx|zip|webmanifest)).*)',
    // Always execute authentication validation on API and TRPC routing endpoints
    '/(api|trpc)(.*)',
  ],
};
