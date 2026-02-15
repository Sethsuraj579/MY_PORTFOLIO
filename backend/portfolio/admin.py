from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order", "created_at", "updated_at")
    list_editable = ("sort_order",)
    search_fields = ("title", "description")
    ordering = ("sort_order", "-created_at")
