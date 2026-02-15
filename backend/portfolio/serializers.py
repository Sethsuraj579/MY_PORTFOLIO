from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    resolved_image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "tags",
            "image",
            "image_url",
            "resolved_image_url",
            "live_url",
            "repo_url",
            "sort_order",
            "created_at",
            "updated_at",
        ]

    def get_resolved_image_url(self, obj: Project) -> str | None:
        if obj.image:
            try:
                return obj.image.url
            except Exception:
                return None
        return obj.image_url or None
