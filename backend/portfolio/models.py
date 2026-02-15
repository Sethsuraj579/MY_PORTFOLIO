from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    tags = models.JSONField(default=list, blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return self.title
